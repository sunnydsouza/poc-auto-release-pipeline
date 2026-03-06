export function formatVersionBanner(version, options = {}) {
  const { channel } = options;
  const normalizedVersion = String(version).trim();

  if (normalizedVersion.length === 0) {
    throw new Error('version is required');
  }

  if (!channel) {
    return `Release ${normalizedVersion}`;
  }

  return `Release ${normalizedVersion} [${String(channel).trim()}]`;
}

