const plugins = [
  [
    '@semantic-release/commit-analyzer',
    {
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'revert', release: 'patch' },
        { type: 'docs', release: false },
        { type: 'chore', release: false },
        { type: 'test', release: false },
        { type: 'ci', release: false }
      ],
      parserOpts: {
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
      }
    }
  ],
  [
    '@semantic-release/release-notes-generator',
    {
      parserOpts: {
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
      }
    }
  ],
  '@semantic-release/changelog',
  [
    '@semantic-release/exec',
    {
      prepareCmd: 'node ./scripts/write-version.mjs ${nextRelease.version}'
    }
  ],
  [
    '@semantic-release/git',
    {
      assets: ['CHANGELOG.md', 'VERSION'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ]
];

if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
  plugins.push([
    '@semantic-release/github',
    {
      successComment: false,
      failComment: false
    }
  ]);
}

module.exports = {
  branches: ['main'],
  tagFormat: 'v${version}',
  plugins
};

