import fastifyCors from '@fastify/cors';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const cors: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyCors, {
    origin: parseCorsOrigin(fastify.config.CORS_ORIGIN),
  });
};

function parseCorsOrigin(origin: string) {
  const normalizedOrigin = origin.trim();

  if (normalizedOrigin === 'false') {
    return false;
  }

  if (normalizedOrigin.includes(',')) {
    return normalizedOrigin.split(',').map((item) => item.trim());
  }

  return normalizedOrigin;
}

export default fastifyPlugin(cors, {
  name: 'cors',
  dependencies: ['app-env'],
});
