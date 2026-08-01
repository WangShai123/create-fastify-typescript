# create-fastify-typescript

[中文](README_zh.md)

A Fastify + TypeScript project template for Node.js 24+. Create a new project with:

```bash
npm create fastify-typescript@latest my-project
```

## Features

- Fastify 5 + TypeScript with modern Node.js 24 output.
- Environment configuration through `@fastify/env`.
- Automatic loading for `plugins/`, `decorators/`, and `routes/` through `@fastify/autoload`.
- Built-in CORS, JWT, Redis, MySQL, rate limit, raw body, and EJS view plugins.
- Example routes for one JSON endpoint and one HTML template endpoint.
- Vite Plus workflows for `vp test` and `vp check`.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

The server listens on `0.0.0.0:3000` by default. Example endpoints:

- `GET /api/test` returns JSON.
- `GET /test` renders HTML through EJS.

## Scripts

```bash
npm run dev      # run TypeScript source with Node 24 watch mode
npm run build    # compile to dist/ and copy templates/
npm start        # run dist/server.js
npm test         # run tests with vp test
npm run check    # run format, lint, and type checks with vp check
```

## Project Structure

```text
.
├── app.ts              # creates Fastify, registers env, and autoloads folders
├── server.ts           # starts the server from fastify.config
├── config/             # environment variable schema
├── decorators/         # Fastify decorators, autoloaded
├── plugins/            # infrastructure plugins, autoloaded
├── routes/             # route entry points, autoloaded
├── services/           # service-layer code
├── templates/          # EJS templates
├── tests/              # Vite Plus tests
├── types/              # Fastify module augmentation
└── utilities/          # shared utility functions
```

## Environment

The configuration schema lives in `config/env.ts`. Copy `.env.example` to `.env`, then update database, Redis, JWT, and other environment-specific values.

`ALIAS` defines the project namespace and defaults to `jealer`. For example, `decorators/userAuth.ts` uses it to create Redis token cache keys:

```text
${ALIAS}:user_token:${userId}
```

MySQL and Redis are disabled by default so the template can start without local infrastructure. Enable them only when the project needs those services:

```env
MYSQL_ENABLED=true
REDIS_ENABLED=true
```

`CORS_ORIGIN` controls `@fastify/cors`. Use `*` for open development access, `false` to disable CORS origins, or a comma-separated list for multiple origins:

```env
CORS_ORIGIN=https://example.com,https://admin.example.com
```

## Autoloading

`app.ts` uses `@fastify/autoload` for:

- `plugins/`: CORS, MySQL, Redis, JWT, rate limit, raw body, view engine, and other infrastructure.
- `decorators/`: for example `fastify.authenticate`.
- `routes/`: all route files.

For new business code, add `routes/{business}.ts` and `services/{business}.ts`. Most features should not require changes to `app.ts`.

## Utilities

Shared, framework-light helper functions live in `utilities/`. Keep utilities small and deterministic so they can be reused from plugins, decorators, routes, and services without creating Fastify coupling.

The template includes `utilities/cache.ts`:

```ts
import { createCacheKey } from './utilities/cache.ts';

const cacheKey = createCacheKey('jealer', 'user_token', userId);
```

Use this style for formatting cache keys, IDs, dates, payload normalization, and other cross-cutting helpers. Business logic should stay in `services/`, while reusable mechanics belong in `utilities/`.

## Scaling Business Modules

The template starts with `routes/` and `services/` because that structure is simple and easy to scan. When the project grows past roughly 10 business areas, move complex features into module folders:

```text
modules/
└── license/
    ├── routes.ts
    ├── service.ts
    ├── schema.ts
    └── repository.ts
```

Keep small features in `routes/` and `services/`. Move a feature to `modules/{feature}/` when its routes, services, schemas, repositories, or internal helpers become easier to maintain together.

## Template Rendering

Templates live in `templates/` and currently use EJS. Routes can return HTML directly:

```ts
fastify.get('/test', async (_request, reply) => {
  return reply.view('home', {
    heading: 'Fastify TypeScript',
    message: 'HTML rendering is ready.',
    title: 'Fastify TypeScript',
  });
});
```

## Deployment

Deploy the `dist/` directory to production environment after building the project with `npm run build`.
