export function formatVersionBanner(version, options = {}) {
  const { channel, prefix = 'Release' } = options;
  const normalizedVersion = String(version).trim();
  const normalizedPrefix = String(prefix).trim();
  const normalizedChannel = typeof channel === 'string' ? channel.trim() : channel;

  if (normalizedVersion.length === 0) {
    throw new Error('version is required');
  }

  if (normalizedPrefix.length === 0) {
    throw new Error('prefix is required');
  }

  if (!normalizedChannel) {
    return `${normalizedPrefix} ${normalizedVersion}`;
  }

  return `${normalizedPrefix} ${normalizedVersion} [${normalizedChannel}]`;
}
