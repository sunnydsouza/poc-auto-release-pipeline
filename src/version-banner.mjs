export function formatVersionBanner(version, options = {}) {
  if (Object.hasOwn(options, 'channel')) {
    throw new Error('channel has been renamed to track');
  }

  const { track, prefix = 'Release' } = options;
  const normalizedVersion = String(version).trim();
  const normalizedPrefix = String(prefix).trim();
  const normalizedTrack = typeof track === 'string' ? track.trim() : track;

  if (normalizedVersion.length === 0) {
    throw new Error('version is required');
  }

  if (normalizedPrefix.length === 0) {
    throw new Error('prefix is required');
  }

  if (!normalizedTrack) {
    return `${normalizedPrefix} ${normalizedVersion}`;
  }

  return `${normalizedPrefix} ${normalizedVersion} [${normalizedTrack}]`;
}
