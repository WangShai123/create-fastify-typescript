#!/usr/bin/env node

import { access, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, '..');

const gitIgnoreContent = `.DS_Store
.vscode
.env
node_modules
dist
coverage
`;

const templateEntries = [
  '.env.example',
  'README.md',
  'README_zh.md',
  'app.ts',
  'config',
  'decorators',
  'plugins',
  'routes',
  'scripts',
  'server.ts',
  'services',
  'templates',
  'tests',
  'tsconfig.json',
  'types',
  'utilities',
  'vite.config.ts',
];

const args = process.argv.slice(2);
const targetName = args[0];

if (!targetName) {
  process.stderr.write(
    'Usage: npm create fastify-typescript@latest <project-name>\n'
  );
  process.exit(1);
}

const targetDir = resolve(process.cwd(), targetName);

try {
  await access(targetDir);
  process.stderr.write(`Target directory already exists: ${targetDir}\n`);
  process.exit(1);
} catch {
  await mkdir(targetDir, { recursive: true });
}

for (const entry of templateEntries) {
  await cp(join(packageRoot, entry), join(targetDir, entry), {
    filter: (source) => !source.endsWith('.DS_Store'),
    recursive: true,
  });
}

await writeFile(join(targetDir, '.gitignore'), gitIgnoreContent);

const packageJson = JSON.parse(
  await readFile(join(packageRoot, 'package.json'), 'utf8')
);

const projectPackage = {
  name: targetName,
  version: '0.1.0',
  private: true,
  description: 'A Fastify application built with TypeScript.',
  type: 'module',
  scripts: packageJson.scripts,
  dependencies: packageJson.dependencies,
  devDependencies: packageJson.devDependencies,
  engines: packageJson.engines,
};

await writeFile(
  join(targetDir, 'package.json'),
  `${JSON.stringify(projectPackage, null, 2)}\n`
);

process.stdout.write(`Created Fastify TypeScript project in ${targetDir}\n`);
process.stdout.write('Next steps:\n');
process.stdout.write(`  cd ${targetName}\n`);
process.stdout.write('  npm install\n');
process.stdout.write('  cp .env.example .env\n');
process.stdout.write('  npm run dev\n');
