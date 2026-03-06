import test from 'node:test';
import assert from 'node:assert/strict';

import { formatVersionBanner } from '../src/version-banner.mjs';

test('formats a basic version banner', () => {
  assert.equal(formatVersionBanner('1.2.3'), 'Release 1.2.3');
});

test('includes an optional track label when provided', () => {
  assert.equal(
    formatVersionBanner('1.2.3', { track: 'stable' }),
    'Release 1.2.3 [stable]'
  );
});

test('supports a custom banner prefix', () => {
  assert.equal(
    formatVersionBanner('1.2.3', { prefix: 'Build' }),
    'Build 1.2.3'
  );
});

test('ignores a whitespace-only track label', () => {
  assert.equal(
    formatVersionBanner('1.2.3', { track: '   ' }),
    'Release 1.2.3'
  );
});

test('rejects the legacy channel option', () => {
  assert.throws(
    () => formatVersionBanner('1.2.3', { channel: 'stable' }),
    /track/
  );
});
