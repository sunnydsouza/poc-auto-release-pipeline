import { detectReleaseType, incrementVersion } from '../src/release-rules.mjs';

const [, , currentVersion = '0.0.0', ...commitMessages] = process.argv;

if (commitMessages.length === 0) {
  console.error(
    'Usage: npm run simulate:release -- <current-version> "feat: add x" "fix: y"'
  );
  process.exit(1);
}

const releaseType = detectReleaseType(commitMessages);
const nextVersion = incrementVersion(currentVersion, releaseType);

console.log(
  JSON.stringify(
    {
      currentVersion,
      releaseType,
      nextVersion,
      commits: commitMessages
    },
    null,
    2
  )
);
