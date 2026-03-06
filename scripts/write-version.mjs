import { writeFileSync } from 'node:fs';

const [, , nextVersion] = process.argv;

if (!nextVersion) {
  console.error('A release version is required.');
  process.exit(1);
}

writeFileSync('VERSION', `${nextVersion}\n`, 'utf8');

