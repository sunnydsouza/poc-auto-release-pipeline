import test from 'node:test';
import assert from 'node:assert/strict';

import { detectReleaseType, incrementVersion } from '../src/release-rules.mjs';

test('ignores non-releasing commit types', () => {
  const releaseType = detectReleaseType([
    'docs: update onboarding notes',
    'chore: tidy repository metadata',
    'test: add examples'
  ]);

  assert.equal(releaseType, null);
});

test('returns patch for fix-style commits', () => {
  const releaseType = detectReleaseType([
    'fix: handle missing tag output',
    'refactor: simplify version parsing',
    'revert: restore release summary'
  ]);

  assert.equal(releaseType, 'patch');
});

test('returns minor when a feature commit is present', () => {
  const releaseType = detectReleaseType([
    'fix: trim commit subject',
    'feat: add channel-aware banner output'
  ]);

  assert.equal(releaseType, 'minor');
});

test('returns major when a breaking change is present', () => {
  const releaseType = detectReleaseType([
    'feat: add channel-aware banner output',
    'feat!: require structured release input'
  ]);

  assert.equal(releaseType, 'major');
});

test('detects breaking changes from footer text', () => {
  const releaseType = detectReleaseType([
    [
      'feat: add channel-aware banner output',
      '',
      'BREAKING CHANGE: the release input must now be structured'
    ].join('\n')
  ]);

  assert.equal(releaseType, 'major');
});

test('increments semantic versions correctly', () => {
  assert.equal(incrementVersion('1.2.3', 'patch'), '1.2.4');
  assert.equal(incrementVersion('1.2.3', 'minor'), '1.3.0');
  assert.equal(incrementVersion('1.2.3', 'major'), '2.0.0');
  assert.equal(incrementVersion('1.2.3', null), '1.2.3');
});
