import { execFileSync, spawnSync } from 'node:child_process';

const domainRules = [
  {
    tag: '@quem-somos',
    paths: ['tests/quem-somos.spec.ts', 'tests/pages/QuemSomosPage.ts', 'tests/data/quem-somos.data.ts'],
  },
  {
    tag: '@trilha-de-estudos',
    paths: [
      'tests/trilha-de-estudos.spec.ts',
      'tests/pages/TrilhaDeEstudosPage.ts',
      'tests/data/trilha-de-estudos.data.ts',
    ],
  },
  {
    tag: '@parcerias',
    paths: ['tests/parcerias.spec.ts', 'tests/pages/ParceriasPage.ts', 'tests/data/parcerias.data.ts'],
  },
  {
    tag: '@sites-para-praticar',
    paths: [
      'tests/sites-para-praticar.spec.ts',
      'tests/pages/SitesParaPraticarPage.ts',
      'tests/data/sites-para-praticar.data.ts',
    ],
  },
  {
    tag: '@ctfl-at',
    paths: ['tests/ctfl-at.spec.ts', 'tests/pages/CtflAtPage.ts', 'tests/data/ctfl-at.data.ts'],
  },
  {
    tag: '@ctfl',
    paths: ['tests/ctfl.spec.ts', 'tests/pages/CtflPage.ts', 'tests/data/ctfl.data.ts'],
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
  console.log('No E2E domain changes detected. Skipping Playwright tests.');
  process.exit(0);
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
