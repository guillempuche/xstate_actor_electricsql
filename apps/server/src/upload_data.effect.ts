// import { type CrudEntryOutputJSON, UpdateType } from '@powersync/common'
import * as Powersync from '@powersync/common'
import type { Request, Response } from 'express'

import {
	dbKyselyEffect,
	dbKyselyEffectNoGenerated,
} from '@localfirst/core/db.effect.js'
import type { TableName } from '@localfirst/core/tables.effect.js'

export async function uploadDataHandlerEffect(req: Request, res: Response) {
	const transactions: Powersync.CrudEntryOutputJSON[] = req.body.transactions

	if (!transactions || transactions.length === 0) {
		return res.status(400).send({ message: 'No transactions provided' })
	}

	try {
		for (const { op, type, id, data } of transactions) {
			switch (op) {
				case Powersync.UpdateType.PUT:
					await dbKyselyEffect
						.insertInto(type as TableName)
						.values({
							...data,
							id,
						})
						.execute()
					break
				case Powersync.UpdateType.PATCH:
					// Without Generated type
					await dbKyselyEffectNoGenerated
						.updateTable(type as TableName)
						.set(data as Record<string, any>)
						.where('id', '=', id)
						.execute()

					// // With Generated type
					// await dbKyselyEffect
					// 	.updateTable(type as TableName)
					// 	.set(data as Record<string, any>)
					// 	.where('id', '=', id)
					// 	.execute()
					break
				case Powersync.UpdateType.DELETE:
					await dbKyselyEffectNoGenerated
						.deleteFrom(type as TableName)
						.where('id', '=', id)
						.execute()
					break
			}
		}

		res.status(200).send({ message: 'Transactions processed successfully' })
	} catch (error) {
		console.error('Error processing transactions:', error)
		res.status(500).send({ message: 'Error processing transactions' })
	}
}
