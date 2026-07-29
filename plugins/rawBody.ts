import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyRawBody from 'fastify-raw-body';

const rawBody: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyRawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
  });
};

export default fastifyPlugin(rawBody, {
  name: 'raw-body',
});
