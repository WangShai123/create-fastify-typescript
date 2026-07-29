# create-fastify-typescript

一个面向 Node.js 24+ 的 Fastify + TypeScript 项目模板。可以通过下面的方式创建项目：

```bash
npm create fastify-typescript@latest my-project
```

## 特性

- Fastify 5 + TypeScript，输出目标为 Node.js 24 的现代语法。
- 使用 `@fastify/env` 统一管理环境变量。
- 使用 `@fastify/autoload` 自动加载 `plugins/`、`decorators/` 和 `routes/`。
- 内置 CORS、JWT、Redis、MySQL、限流、raw body 和 EJS 模板渲染插件。
- 示例路由包含 JSON 接口和 HTML 模板渲染。
- 使用 Vite Plus 提供 `vp test` 和 `vp check` 工作流。

## 快速开始

```bash
npm install
cp .env.example .env
npm run dev
```

服务默认监听 `0.0.0.0:3000`。示例端点：

- `GET /api/test` 返回 JSON。
- `GET /test` 返回 EJS 渲染的 HTML。

## 脚本

```bash
npm run dev      # 使用 Node 24 监听 TypeScript 源码变更
npm run build    # 编译到 dist/ 并复制 templates/
npm start        # 运行 dist/server.js
npm test         # 通过 vp test 运行测试
npm run check    # 通过 vp check 执行格式、lint 和类型检查
```

## 目录结构

```text
.
├── app.ts              # 创建 Fastify 实例，注册 env 和自动加载目录
├── server.ts           # 读取 fastify.config 并启动服务
├── config/             # 环境变量 schema
├── decorators/         # Fastify 装饰器，自动加载
├── plugins/            # 基础设施插件，自动加载
├── routes/             # 路由入口，自动加载
├── services/           # 业务服务代码
├── templates/          # EJS 模板
├── tests/              # Vite Plus 测试
├── types/              # Fastify 类型增强
└── utilities/          # 通用工具方法
```

## 环境变量

配置 schema 在 `config/env.ts` 中维护。复制 `.env.example` 到 `.env` 后按环境修改数据库、Redis、JWT 等配置。

`ALIAS` 用于生成项目级别的命名空间，默认是 `jealer`。例如 `decorators/userAuth.ts` 会使用它生成 Redis token 缓存 key：

```text
${ALIAS}:user_token:${userId}
```

MySQL 和 Redis 默认关闭，这样模板在没有本地基础设施时也能启动。项目需要这些服务时再显式启用：

```env
MYSQL_ENABLED=true
REDIS_ENABLED=true
```

`CORS_ORIGIN` 用于配置 `@fastify/cors`。开发时可以使用 `*`，设置为 `false` 可以关闭 CORS origin，也可以使用逗号分隔多个 origin：

```env
CORS_ORIGIN=https://example.com,https://admin.example.com
```

## 自动加载

`app.ts` 使用 `@fastify/autoload` 自动加载：

- `plugins/`：CORS、MySQL、Redis、JWT、限流、raw body、模板引擎等基础设施。
- `decorators/`：例如 `fastify.authenticate`。
- `routes/`：所有路由文件。

新增业务时，优先新增 `routes/{business}.ts` 和 `services/{business}.ts`，通常不需要修改 `app.ts`。

## 工具方法

通用、轻量、尽量不绑定 Fastify 的工具方法放在 `utilities/`。这些方法应保持小而确定，方便在 plugins、decorators、routes 和 services 中复用。

模板已提供 `utilities/cache.ts`：

```ts
import { createCacheKey } from './utilities/cache.ts';

const cacheKey = createCacheKey('jealer', 'user_token', userId);
```

缓存 key、ID、日期格式化、payload 规范化等跨业务辅助逻辑适合放在这里。业务逻辑仍放在 `services/`，可复用的机制性代码放在 `utilities/`。

## 业务模块扩展

模板默认使用 `routes/` 和 `services/` 分层，因为这个结构简单、直观。业务较多时，比如超过 10 个业务域，可以把复杂业务迁移到模块目录：

```text
modules/
└── license/
    ├── routes.ts
    ├── service.ts
    ├── schema.ts
    └── repository.ts
```

简单业务继续放在 `routes/` 和 `services/`。当某个业务的 routes、services、schemas、repositories 或内部 helper 放在一起更容易维护时，再迁移到 `modules/{feature}/`。

## 模板渲染

模板目录为 `templates/`，当前使用 EJS。路由中可直接返回 HTML：

```ts
fastify.get('/test', async (_request, reply) => {
  return reply.view('home', {
    heading: 'Fastify TypeScript',
    message: 'HTML rendering is ready.',
    title: 'Fastify TypeScript',
  });
});
```
