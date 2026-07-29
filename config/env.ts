import fastifyEnv from '@fastify/env';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export const schema = {
  type: 'object',
  required: ['JWT_SECRET'],
  properties: {
    NODE_ENV: { type: 'string', default: 'development' },
    HOST: { type: 'string', default: '0.0.0.0' },
    PORT: { type: 'integer', default: 3000 },
    ALIAS: { type: 'string', default: 'jealer' },

    JWT_SECRET: { type: 'string' },
    TOKEN_EXPIRES_IN: { type: 'integer', default: 604800 },

    LICENSE_PREFIX: { type: 'string', default: '' },
    LICENSE_SALT: { type: 'string', default: '' },
    LICENSE_ENCRYPT_KEY: { type: 'string', default: '5ebec86f4404d2c1' },

    MYSQL_ENABLED: { type: 'boolean', default: false },
    MYSQL_HOST: { type: 'string', default: 'localhost' },
    MYSQL_PORT: { type: 'integer', default: 3306 },
    MYSQL_USER: { type: 'string', default: 'root' },
    MYSQL_PASSWORD: { type: 'string', default: '' },
    MYSQL_DATABASE: { type: 'string', default: '' },
    MYSQL_TIMEZONE: { type: 'string', default: 'Z' },

    REDIS_ENABLED: { type: 'boolean', default: false },
    REDIS_HOST: { type: 'string', default: '127.0.0.1' },
    REDIS_PORT: { type: 'integer', default: 6379 },

    RATE_LIMIT_MAX: { type: 'integer', default: 30 },
    RATE_LIMIT_TIME_WINDOW: { type: 'string', default: '1minute' },

    WEBHOOK_SECRET: { type: 'string', default: '' },
    WEBHOOK_SCRIPT: { type: 'string', default: '/www/wwwroot/hook/jealer.sh' },

    CORS_ORIGIN: { type: 'string', default: '*' },
  },
};

const env: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema,
    dotenv: true,
  });
};

export default fastifyPlugin(env, {
  name: 'app-env',
});
