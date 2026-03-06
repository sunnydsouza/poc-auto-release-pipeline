import test from 'node:test';
import assert from 'node:assert/strict';

import { formatVersionBanner } from '../src/version-banner.mjs';

test('formats a basic version banner', () => {
  assert.equal(formatVersionBanner('1.2.3'), 'Release 1.2.3');
});

test('includes an optional channel label when provided', () => {
  assert.equal(
    formatVersionBanner('1.2.3', { channel: 'stable' }),
    'Release 1.2.3 [stable]'
  );
});

