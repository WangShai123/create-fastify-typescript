import type { FastifyPluginAsync } from 'fastify';

import type { AuthTokenPayload } from '../types/fastify.ts';
import { createCacheKey } from '../utilities/cache.ts';

const userAuth: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return reply.status(401).send({ error: 'Authentication required' });
      }

      const decoded = fastify.jwt.verify<AuthTokenPayload>(token);
      request.user = decoded;

      const cacheKey = createCacheKey(
        fastify.config.ALIAS,
        'user_token',
        decoded.id
      );
      const storedToken = await fastify.redis.get(cacheKey);
      if (!storedToken || storedToken !== token) {
        return reply.status(401).send({ error: 'Invalid token' });
      }
    } catch {
      return reply.status(401).send({ error: 'Invalid token' });
    }
  });
};

export default userAuth;
