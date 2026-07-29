import fastifyJwt from '@fastify/jwt';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const jwt: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  });
};

export default fastifyPlugin(jwt, {
  name: 'jwt',
  dependencies: ['app-env'],
});
