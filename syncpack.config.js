/**
 * Syncpack docs https://jamiemason.github.io/
 */

module.exports = {
	dependencyTypes: ['dev', 'overrides', 'pnpmOverrides', 'prod', 'resolutions'],
	filter: '.',
	packages: [
		'package.json',
		'apps/*/package.json',
		'packages/*/package.json',
		'packages/*/*/package.json',
	],
	semverRange: '^',
	sortAz: [
		'contributors',
		'dependencies',
		'devDependencies',
		'keywords',
		'peerDependencies',
		'resolutions',
		'scripts',
	],
	sortFirst: [
		'name',
		'version',
		'description',
		'private',
		'workspaces',
		'type',
		'import',
		'exports',
		'main',
		'types',
		'files',
		'scripts',
		'resolutions',
		'dependencies',
		'devDependencies',
		'peerDependencies',
		'packageManager',
		'engines',
		'license',
		'homepage',
		'bugs',
		'repository',
		'author',
		'contributors',
	],
	sortPackages: true,
	versionGroups: [],
}
