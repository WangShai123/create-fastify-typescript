import Fastify from 'fastify';
import { describe, expect, it } from 'vite-plus/test';

import appView from '../plugins/view.ts';
import testRoutes from '../routes/test.ts';
import { getTestStatus } from '../services/test.ts';
import { createCacheKey } from '../utilities/cache.ts';

describe('template routes', () => {
  it('returns a JSON health payload', async () => {
    const app = Fastify({ logger: false });
    await app.register(testRoutes);

    const response = await app.inject('/api/test');
    const payload = response.json();

    expect(response.statusCode).toBe(200);
    expect(payload).toMatchObject({
      message: 'Fastify TypeScript template is running.',
      service: 'create-fastify-typescript',
      status: 'ok',
    });

    await app.close();
  });

  it('renders an HTML template', async () => {
    const app = Fastify({ logger: false });
    await app.register(appView);
    await app.register(testRoutes);

    const response = await app.inject('/test');

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('<h1>Fastify TypeScript</h1>');

    await app.close();
  });

  it('creates deterministic service payloads with an injected date', () => {
    expect(getTestStatus(new Date('2026-01-01T00:00:00.000Z'))).toEqual({
      message: 'Fastify TypeScript template is running.',
      service: 'create-fastify-typescript',
      status: 'ok',
      timestamp: '2026-01-01T00:00:00.000Z',
    });
  });

  it('builds namespaced cache keys', () => {
    expect(createCacheKey('jealer', 'user_token', 12)).toBe(
      'jealer:user_token:12'
    );
    expect(createCacheKey('my:app', 'user_token', 'user:12')).toBe(
      'my_app:user_token:user_12'
    );
  });
});
