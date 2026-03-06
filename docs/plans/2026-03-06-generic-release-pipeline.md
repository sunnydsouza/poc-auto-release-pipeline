# Generic Release Pipeline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and verify a generic semantic-versioning GitHub Actions pipeline with an empty starting repository and real release simulations on `main`.

**Architecture:** Use a small Node-based tooling layer to drive `semantic-release` while keeping the release output generic through `VERSION`, `CHANGELOG.md`, and GitHub Releases. Add a tiny sample module and tests so the repository is not just workflow configuration and the branch simulations have concrete code changes to merge.

**Tech Stack:** GitHub Actions, Node.js, semantic-release, Node test runner

---

### Task 1: Scaffold the release tooling repository

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `CHANGELOG.md`
- Create: `VERSION`

**Step 1: Add the minimal repository metadata and scripts**

- Add package metadata and scripts for `test`, `release:dry-run`, and local simulation.

**Step 2: Install release dependencies**

Run: `npm install`

Expected: `package-lock.json` created successfully.

**Step 3: Verify dependency installation**

Run: `npm ls --depth=0`

Expected: all direct dependencies resolved.

### Task 2: Add TDD-backed demo code and bump simulator

**Files:**
- Create: `src/version-banner.mjs`
- Create: `src/release-rules.mjs`
- Create: `scripts/simulate-release.mjs`
- Create: `test/version-banner.test.mjs`
- Create: `test/release-rules.test.mjs`

**Step 1: Write failing tests for release classification and sample behavior**

Run: `npm test`

Expected: tests fail because implementation files do not exist yet.

**Step 2: Add minimal implementation**

- Implement the sample module and commit-classification helpers.

**Step 3: Verify tests pass**

Run: `npm test`

Expected: all tests pass.

### Task 3: Add semantic-release configuration and workflow

**Files:**
- Create: `release.config.cjs`
- Create: `.github/workflows/release.yml`
- Create: `scripts/write-version.mjs`
- Create: `docs/examples/npm-publish-example.yml`
- Create: `docs/examples/docker-publish-example.yml`

**Step 1: Configure release rules and repository metadata updates**

- Configure `semantic-release` with GitHub release publishing, changelog updates, and generic `VERSION` file updates.

**Step 2: Add workflow**

- Run tests first, then `semantic-release` on `push` to `main`.

**Step 3: Verify workflow configuration locally**

Run: `npm run release:dry-run`

Expected: dry run completes and reports either the next version or that no release is due.

### Task 4: Create initial release on main

**Files:**
- Modify: repository files created above

**Step 1: Commit initial setup using a releasable conventional commit**

Run: `git commit -m "feat: bootstrap generic semantic release pipeline"`

Expected: first real commit on `main`.

**Step 2: Push to remote**

Run: `git push -u origin main`

Expected: GitHub Actions release workflow starts.

**Step 3: Verify first release**

- Confirm tag and GitHub Release exist for the first version.

### Task 5: Simulate minor, patch, and major releases through branches

**Files:**
- Modify: sample code and tests

**Step 1: Minor release branch**

- Create branch, add `feat:` commit, merge to `main`, push, verify next minor version.

**Step 2: Patch release branch**

- Create branch, add `fix:` commit, merge to `main`, push, verify next patch version.

**Step 3: Major release branch**

- Create branch, add `feat!:` commit with `BREAKING CHANGE:`, merge to `main`, push, verify next major version.

### Task 6: Final verification and documentation

**Files:**
- Modify: `README.md`

**Step 1: Document how to reuse the pipeline in other stacks**

- Explain what files are generic and where stack-specific publishing plugs in.

**Step 2: Run final verification**

Run: `npm test`
Run: `npm run release:dry-run`
Run: `git tag --list`

Expected: tests pass, dry run succeeds, expected tags are visible locally and remotely after fetch.
