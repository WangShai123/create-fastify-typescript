import type { FastifyPluginAsync } from 'fastify';

import { getHomeViewModel, getTestStatus } from '../services/test.ts';

const testRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/test', async () => getTestStatus());

  fastify.get('/test', async (_request, reply) => {
    return reply.view('home', getHomeViewModel());
  });
};

export default testRoutes;
