module.exports = {
  git: {
    commitMessage: 'chore: release ${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
    },
    "release-it-yarn-workspaces": {
      "workspaces": ["packages/core", "packages/plugins/*"]
    }
  },
};
