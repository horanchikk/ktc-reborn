/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    {
      name: 'master',
      prerelease: false,
      main: true,
    },
    {
      name: 'dev',
      prerelease: 'dev',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: './CHANGELOG.md',
    }],
    [
      '@semantic-release/git',
      {
        assets: ['docs/CHANGELOG.md'],
      },
    ],
    '@semantic-release/github',
  ],
}
