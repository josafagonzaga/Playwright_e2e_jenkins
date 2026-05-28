import { execFileSync, spawnSync } from 'node:child_process';

const domainRules = [
  {
    tag: '@home',
    paths: ['tests/home.spec.ts', 'tests/pages/HomePage.ts'],
  },
];

const globalPaths = [
  '.github/',
  'package.json',
  'package-lock.json',
  'playwright.config.ts',
  'tsconfig.json',
  'eslint.config.mjs',
  'tests/fixtures/',
  'tests/pages/BasePage.ts',
  'tests/data/shared.data.ts',
];

const commandArgs = process.argv.slice(2);
const changedFiles = commandArgs.length > 0 ? commandArgs : getChangedFiles();

if (changedFiles.length === 0) {
  console.log('No changed files detected. Running the full Playwright suite.');
  runPlaywright([]);
}

if (changedFiles.some((file) => globalPaths.some((path) => file.startsWith(path)))) {
  console.log('Global test-related files changed. Running the full Playwright suite.');
  runPlaywright([]);
}

const tags = domainRules
  .filter((rule) => changedFiles.some((file) => rule.paths.some((path) => file.startsWith(path))))
  .map((rule) => rule.tag);

if (tags.length === 0) {
  console.log('E2E files changed without a mapped tag. Running the full Playwright suite.');
  runPlaywright([]);
}

const grep = tags.map(toTagTokenRegex).join('|');

console.log(`Changed files:\n${changedFiles.map((file) => `- ${file}`).join('\n')}`);
console.log(`Running impacted Playwright tests for: ${tags.join(', ')}`);
runPlaywright(['--grep', grep]);

function getChangedFiles() {
  const candidates = [];

  if (process.env.GITHUB_BASE_REF) {
    candidates.push(['diff', '--name-only', `origin/${process.env.GITHUB_BASE_REF}...HEAD`]);
  }

  candidates.push(['diff', '--name-only', 'origin/main...HEAD']);
  candidates.push(['diff', '--name-only', 'HEAD~1...HEAD']);
  candidates.push(['diff', '--name-only']);

  for (const args of candidates) {
    try {
      const output = execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const files = output.split('\n').filter(Boolean);

      if (files.length > 0) {
        return files;
      }
    } catch {
      // Try the next diff strategy.
    }
  }

  return [];
}

function runPlaywright(args) {
  const result = spawnSync('npx', ['playwright', 'test', ...args], { stdio: 'inherit' });

  process.exit(result.status ?? 1);
}

function toTagTokenRegex(value) {
  return `${escapeRegex(value)}(\\s|$)`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
