import fastifyRedis from '@fastify/redis';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const redis: FastifyPluginAsync = async (fastify) => {
  const config = fastify.config;

  if (!config.REDIS_ENABLED) {
    fastify.log.info('Redis plugin skipped because REDIS_ENABLED=false');
    return;
  }

  await fastify.register(fastifyRedis, {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  });
};
export default fastifyPlugin(redis, {
  name: 'redis',
  dependencies: ['app-env'],
});
