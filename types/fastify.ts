import type { MySQLPromisePool } from '@fastify/mysql';
import type { FastifyReply, FastifyRequest } from 'fastify';

export interface AppConfig {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  ALIAS: string;
  JWT_SECRET: string;
  TOKEN_EXPIRES_IN: number;
  LICENSE_PREFIX: string;
  LICENSE_SALT: string;
  LICENSE_ENCRYPT_KEY: string;
  MYSQL_ENABLED: boolean;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  MYSQL_TIMEZONE: string;
  REDIS_ENABLED: boolean;
  REDIS_HOST: string;
  REDIS_PORT: number;
  RATE_LIMIT_MAX: number;
  RATE_LIMIT_TIME_WINDOW: string;
  WEBHOOK_SECRET: string;
  WEBHOOK_SCRIPT: string;
  CORS_ORIGIN: string;
}

export interface AuthTokenPayload {
  id: number | string;
  [key: string]: unknown;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AuthTokenPayload;
    user: AuthTokenPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<FastifyReply | void>;
    config: AppConfig;
    mysql: MySQLPromisePool;
  }
}
