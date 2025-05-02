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
    {
      name: 'pre-dev',
      prerelease: 'pre-dev',
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
        assets: ['CHANGELOG.md'],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: `${process.env.APP_VERSION}.apk`,
            label: 'Android APK [${nextRelease.version}]',
          },
        ],
      },
    ],
  ],
}
