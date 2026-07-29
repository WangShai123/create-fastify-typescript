import rateLimit from '@fastify/rate-limit';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const appRateLimit: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rateLimit, {
    max: fastify.config.RATE_LIMIT_MAX,
    timeWindow: fastify.config.RATE_LIMIT_TIME_WINDOW,
  });
};

export default fastifyPlugin(appRateLimit, {
  name: 'app-rate-limit',
  dependencies: ['app-env'],
});
