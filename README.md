# Koa Template

一个基于 **Koa + TypeScript + Prisma** 的后端开发模板，开箱即用，适合快速搭建 Node.js 后端项目。

## 🚀 技术栈

- **Koa 3** - 轻量级 Node.js Web 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Prisma 7** - 现代化 ORM，支持类型安全的数据库操作
- **PostgreSQL** - 强大的开源关系型数据库
- **Docker Compose** - 一键启动开发环境
- **ESLint** - 代码规范检查 (使用 @antfu/eslint-config)
- **pnpm** - 快速、节省磁盘空间的包管理器
- **Swagger (OpenAPI)** - 基于 `koa-swagger-decorator` 自动生成 API 文档
- **Vitest** - 快速生成测试用例
## 📁 项目结构

```
├── prisma/
│   ├── schema.prisma        # Prisma 数据库模型定义
│   └── migrations/          # 数据库迁移文件
├── test/
│   └── sample.test.ts        # Vitest 单元测试（mock Prisma）
├── src/
│   ├── index.ts             # 应用入口
│   ├── controller/          # 控制器
│   ├── middleware/          # 中间件
│   ├── router/              # 路由与 Swagger 配置
│   ├── schema/              # 请求参数校验/类型（zod）
│   ├── service/             # 业务逻辑与数据访问
│   ├── types/               # 类型定义
│   ├── utils/               # 工具函数
│   └── generated/prisma/    # Prisma 自动生成的客户端
├── docker-compose.yml       # Docker 编排配置
├── Dockerfile               # Docker 镜像构建
└── package.json
```

## 🧭 Swagger (API 文档)

- **启用说明**: 项目使用 `koa-swagger-decorator` 自动生成 OpenAPI 文档和 UI。
- **访问地址**: 启动服务后打开 `http://localhost:3000/api/swagger-html` 查看 Swagger UI；`http://localhost:3000/api/swagger-json` 返回 OpenAPI JSON。
- **路由前缀**: 当前 API 路由统一前缀为 `/api`（见 [src/router/index.ts](src/router/index.ts#L17)）。

## 🛠️ 快速开始

### 前置要求

- Node.js 20.19+
- pnpm
- Docker & Docker Compose

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

创建 `.env` 文件（本地开发）:

```env
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres"
PORT=3000
```

创建 `.env.prod` 文件（Docker 环境）:

```env
DATABASE_URL="postgresql://postgres:prisma@postgres_db:5432/postgres"
PORT=3000
```

### 3. 启动数据库

使用 Docker Compose 启动 PostgreSQL:

```bash
docker compose up postgres_db -d
```

### 4. 初始化数据库

```bash
pnpm prisma:migrate
```

### 5. 启动开发服务器

```bash
pnpm dev
```

服务将运行在 http://localhost:3000

## 🐳 Docker 一键部署

启动所有服务（PostgreSQL + Server）:

```bash
docker compose up -d
```

服务端口:
- **应用服务**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## 📜 可用脚本

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动开发服务器（热重载） |
| `pnpm test` | 运行 Vitest 单元测试 |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm prisma:generate` | 生成 Prisma 客户端 |
| `pnpm prisma:migrate` | 创建并应用数据库迁移 |
| `pnpm db:deploy` | 部署迁移并生成客户端（生产环境） |

## ✅ 测试（Vitest）

测试使用 Vitest，目前示例测试通过 `vi.mock('../src/utils/prisma')` + `src/utils/__mocks__/prisma.ts` 深度 mock Prisma Client，因此**不依赖本地 PostgreSQL**。

测试相关资料
[prisma集成vitest](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o)
```bash
pnpm test
```

## 🗄️ 数据库操作

### 创建新迁移

```bash
pnpm prisma:migrate
```

### 打开 Prisma Studio

```bash
npx prisma studio
```

### 重置数据库

```bash
npx prisma migrate reset
```

## 📝 开发指南

### 添加新的数据模型

1. 编辑 `prisma/schema.prisma` 添加模型
2. 运行 `pnpm prisma:migrate` 创建迁移
3. Prisma 客户端会自动生成到 `src/generated/prisma/`

### 添加新的路由

在 `src/controller` 中创建新的 controller 文件添加路由:

```typescript
import type { Context } from 'koa'
import { routeConfig } from 'koa-swagger-decorator'

class UserController {
  @routeConfig({
    method: 'get',
    path: '/users',
    summary: 'Get all users',
    description: 'example of api',
    tags: ['USER'],
  })
  async getUsers(ctx: Context) {
    ctx.body = { users: [] }
  }
}

export { UserController }
```

提示：该路由最终访问路径为 `GET /api/users`（因为在 [src/router/index.ts](src/router/index.ts#L1) 中设置了 `router.prefix('/api')`）。

## 📄 License

MIT
