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
    '@semantic-release/changelog',
    '@semantic-release/github',
  ],
}
