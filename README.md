# Generic GitHub Actions Release Pipeline Demo

This repository demonstrates a stack-agnostic release pipeline built around:

- semantic versioning
- conventional commits
- GitHub Actions
- GitHub Releases
- a generic `VERSION` file for non-Node projects

The workflow releases on `push` to `main` and uses the highest-impact conventional commit since the last tag.

## Release rules

- `feat:` => minor
- `fix:`, `perf:`, `refactor:`, `revert:` => patch
- `feat!:` or `BREAKING CHANGE:` => major
- `docs:`, `chore:`, `test:`, `ci:` => no release

## What is generic here

This repository uses Node only to run the release automation. The project version itself is exposed through:

- Git tags such as `v1.2.3`
- GitHub Releases
- `CHANGELOG.md`
- `VERSION`

That makes the template usable for non-Node repositories too.

## Local verification

- `npm test`
- `npm run simulate:release -- 1.2.3 "fix: trim commit subject" "feat: add banner channel"`
- `npm run release:dry-run`

## Optional publish examples

Examples for npm and Docker publishing live in [docs/examples/npm-publish-example.yml](/Users/sunnydsouza/development/Projects/github-actions/poc-auto-release-pipeline/docs/examples/npm-publish-example.yml) and [docs/examples/docker-publish-example.yml](/Users/sunnydsouza/development/Projects/github-actions/poc-auto-release-pipeline/docs/examples/docker-publish-example.yml). They are intentionally not active by default.
