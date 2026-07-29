import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import view from '@fastify/view';
import ejs from 'ejs';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appView: FastifyPluginAsync = async (fastify) => {
  await fastify.register(view, {
    engine: { ejs },
    root: join(__dirname, '..', 'templates'),
    includeViewExtension: true,
    viewExt: 'ejs',
    defaultContext: {
      siteName: 'Jealer',
    },
  });
};

export default fastifyPlugin(appView, {
  name: 'view',
});
