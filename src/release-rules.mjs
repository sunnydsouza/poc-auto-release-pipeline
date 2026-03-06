const RELEASE_ORDER = {
  patch: 1,
  minor: 2,
  major: 3
};

const PATCH_TYPES = new Set(['fix', 'perf', 'refactor', 'revert']);
const MINOR_TYPES = new Set(['feat']);
const NO_RELEASE_TYPES = new Set(['docs', 'chore', 'test', 'ci']);

export function detectReleaseType(commits) {
  let strongestRelease = null;

  for (const commit of commits) {
    const detectedRelease = detectCommitRelease(commit);

    if (!detectedRelease) {
      continue;
    }

    if (
      strongestRelease === null ||
      RELEASE_ORDER[detectedRelease] > RELEASE_ORDER[strongestRelease]
    ) {
      strongestRelease = detectedRelease;
    }
  }

  return strongestRelease;
}

export function incrementVersion(version, releaseType) {
  const normalizedVersion = String(version).trim().replace(/^v/, '');
  const [major, minor, patch] = normalizedVersion.split('.').map(Number);

  if ([major, minor, patch].some(Number.isNaN)) {
    throw new Error(`Invalid semantic version: ${version}`);
  }

  if (releaseType === 'major') {
    return `${major + 1}.0.0`;
  }

  if (releaseType === 'minor') {
    return `${major}.${minor + 1}.0`;
  }

  if (releaseType === 'patch') {
    return `${major}.${minor}.${patch + 1}`;
  }

  return `${major}.${minor}.${patch}`;
}

function detectCommitRelease(commit) {
  const normalizedCommit = String(commit).trim();

  if (normalizedCommit.length === 0) {
    return null;
  }

  if (hasBreakingChangeFooter(normalizedCommit)) {
    return 'major';
  }

  const header = normalizedCommit.split('\n', 1)[0];
  const match = /^(?<type>[a-z]+)(?:\([^)]+\))?(?<breaking>!)?:/.exec(header);

  if (!match?.groups) {
    return null;
  }

  if (match.groups.breaking === '!') {
    return 'major';
  }

  const type = match.groups.type;

  if (MINOR_TYPES.has(type)) {
    return 'minor';
  }

  if (PATCH_TYPES.has(type)) {
    return 'patch';
  }

  if (NO_RELEASE_TYPES.has(type)) {
    return null;
  }

  return null;
}

function hasBreakingChangeFooter(commit) {
  return /BREAKING CHANGE:/m.test(commit);
}

