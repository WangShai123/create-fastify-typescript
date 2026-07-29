import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..');
const distDir = join(rootDir, 'dist');

await mkdir(distDir, { recursive: true });
await rm(join(distDir, 'templates'), { force: true, recursive: true });
await cp(join(rootDir, 'templates'), join(distDir, 'templates'), {
  recursive: true,
});
