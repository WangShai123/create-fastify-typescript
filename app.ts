import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import autoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import type { FastifyServerOptions } from 'fastify';

import env from './config/env.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildApp(opts: FastifyServerOptions = {}) {
  const fastify = Fastify({
    logger: opts.logger ?? true,
    ...opts,
  });

  await fastify.register(env);

  await fastify.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    encapsulate: false,
    forceESM: true,
  });

  await fastify.register(autoLoad, {
    dir: join(__dirname, 'decorators'),
    encapsulate: false,
    forceESM: true,
  });

  await fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    forceESM: true,
  });

  return fastify;
}
