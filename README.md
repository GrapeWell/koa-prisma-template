# Eco Board Server TS

一个基于 **Koa + TypeScript + Prisma** 的后端开发模板，开箱即用，适合快速搭建 Node.js 后端项目。

## 🚀 技术栈

- **Koa 3** - 轻量级 Node.js Web 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Prisma 7** - 现代化 ORM，支持类型安全的数据库操作
- **PostgreSQL** - 强大的开源关系型数据库
- **Docker Compose** - 一键启动开发环境
- **ESLint** - 代码规范检查 (使用 @antfu/eslint-config)
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📁 项目结构

```
├── prisma/
│   ├── schema.prisma        # Prisma 数据库模型定义
│   └── migrations/          # 数据库迁移文件
├── src/
│   ├── index.ts             # 应用入口
│   ├── app/                 # 应用配置
│   ├── controller/          # 控制器
│   ├── entity/              # 实体定义
│   ├── middleware/          # 中间件
│   ├── swagger/             # API 文档
│   ├── types/               # 类型定义
│   ├── utils/               # 工具函数
│   └── generated/prisma/    # Prisma 自动生成的客户端
├── docker-compose.yml       # Docker 编排配置
├── Dockerfile               # Docker 镜像构建
└── package.json
```

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
```

创建 `.env.prod` 文件（Docker 环境）:

```env
DATABASE_URL="postgresql://postgres:prisma@postgres_db:5432/postgres"
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

启动所有服务（PostgreSQL + Server + Prisma Studio）:

```bash
docker compose up -d
```

服务端口:
- **应用服务**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555
- **PostgreSQL**: localhost:5432

## 📜 可用脚本

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动开发服务器（热重载） |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm prisma:generate` | 生成 Prisma 客户端 |
| `pnpm prisma:migrate` | 创建并应用数据库迁移 |
| `pnpm db:deploy` | 部署迁移并生成客户端（生产环境） |

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

在 `src/index.ts` 或创建新的 controller 文件添加路由:

```typescript
router.get('/api/users', async (ctx) => {
  const users = await prisma.user.findMany()
  ctx.body = users
})
```

## 📄 License

MIT
