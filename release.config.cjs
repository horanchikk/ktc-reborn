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
        assets: ['CHANGELOG.md'],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'android/app/build/outputs/apk/release/app-release-unsigned.apk',
            label: 'Android APK [${nextRelease.version}]',
          },
        ],
      },
    ],
  ],
}
