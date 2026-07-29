import fastifyMysql from '@fastify/mysql';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const mysql: FastifyPluginAsync = async (fastify) => {
  const config = fastify.config;

  if (!config.MYSQL_ENABLED) {
    fastify.log.info('MySQL plugin skipped because MYSQL_ENABLED=false');
    return;
  }

  await fastify.register(fastifyMysql, {
    promise: true,
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    port: config.MYSQL_PORT,
    timezone: config.MYSQL_TIMEZONE,
  });
};

export default fastifyPlugin(mysql, {
  name: 'mysql',
  dependencies: ['app-env'],
});
