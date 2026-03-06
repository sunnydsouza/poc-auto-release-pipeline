# Generic Release Pipeline Design

**Date:** 2026-03-06

## Goal

Create a reusable GitHub Actions release pipeline that works for a solo developer across different application stacks. The pipeline should infer the next semantic version from conventional commits, create a Git tag, publish a GitHub Release, and maintain simple release metadata in the repository.

## Constraints

- The repository starts empty.
- The workflow must run on `push` to `main`.
- The setup should stay generic rather than assume one deployment target.
- The demo must prove `MINOR`, `PATCH`, and `MAJOR` bump behavior through real branch merges.
- The user explicitly approved working directly on `main` for the initial setup and release simulation.

## Recommended Approach

Use `semantic-release` as the release engine and GitHub Actions as the execution environment.

Why:

- It already solves conventional-commit analysis, tagging, and release note generation.
- It can run without a package registry, which keeps the core workflow cross-stack.
- It supports a first release without a manually seeded tag.
- It can update repository artifacts such as `CHANGELOG.md` and a generic `VERSION` file.

## Versioning Rules

- `feat:` => `MINOR`
- `fix:` => `PATCH`
- `perf:` => `PATCH`
- `refactor:` => `PATCH`
- `revert:` => `PATCH`
- `feat!:` or `BREAKING CHANGE:` => `MAJOR`
- `docs:`, `chore:`, `test:`, `ci:` => no release
- Highest bump since the last tag wins

## Repository Shape

- `package.json`
  - Contains release tooling dependencies and verification scripts only.
- `release.config.cjs`
  - Central release rules and plugin configuration.
- `.github/workflows/release.yml`
  - Runs tests and executes `semantic-release` on `push` to `main`.
- `VERSION`
  - Generic stack-agnostic version file updated during release.
- `CHANGELOG.md`
  - Generated and updated by `semantic-release`.
- `src/`
  - Small sample module used for tests and demo commits.
- `test/`
  - Tests for the sample module and version-bump helper logic.
- `scripts/`
  - Small helper scripts for local simulation and release metadata updates.
- `docs/examples/`
  - Optional publish examples for npm and Docker, kept outside active workflows.

## Release Flow

1. Developer merges or pushes conventional commits to `main`.
2. GitHub Actions checks out full history, installs dependencies, and runs tests.
3. `semantic-release` reads commits since the last tag.
4. If no releasable commits exist, the workflow exits without creating a tag.
5. If a release is needed:
   - compute the next semantic version
   - generate release notes
   - update `CHANGELOG.md`
   - update `VERSION`
   - commit release metadata back to `main`
   - create tag `vX.Y.Z`
   - publish GitHub Release

## Demo Plan

1. Initial setup committed to `main` as a releasable change, producing the first release.
2. Create a feature branch with a `feat:` commit, merge to `main`, verify a minor release.
3. Create a fix branch with a `fix:` commit, merge to `main`, verify a patch release.
4. Create a breaking-change branch with `feat!:` and `BREAKING CHANGE:`, merge to `main`, verify a major release.

## Error Handling

- Workflow must use `fetch-depth: 0` so tags and commit history are available.
- Release job must have `contents: write` permission for tags, releases, and changelog commits.
- Release commit message should include `[skip ci]` to avoid release loops.
- Local verification should include tests and `semantic-release --dry-run`.

## Why Not Bake In Publishing

Registry and artifact publishing are stack-specific. A generic release template should stop at versioning, tags, GitHub Releases, and generic metadata. npm and Docker publishing remain documented examples that teams can enable selectively.
