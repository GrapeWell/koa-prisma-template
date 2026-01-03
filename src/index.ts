import process from 'node:process'
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import { errorMiddleware } from './middleware/error.js'
import { loggerMiddleware } from './middleware/log.js'
import { prismaMiddleware } from './middleware/prisma.js'

import router from './router/'

import 'dotenv/config'

const app = new Koa()

// 错误处理中间件，统一错误响应格式
app.use(errorMiddleware)

// 日志中间件，主要是记录请求的响应时间，为后续慢请求分析做准备
app.use(loggerMiddleware)

// Prisma 中间件，将 prisma 客户端注入到 ctx.state 中
app.use(prismaMiddleware())

// 添加CORS支持
app.use(
  cors({
    origin: '*', // 在生产环境中应该设置具体的域名
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    maxAge: 86400, // 预检请求缓存1天
  }),
)

// 解析请求体
app.use(bodyParser())

// 响应压缩
app.use(
  compress({
    threshold: 2048, // 2kb以上的响应进行压缩
  }),
)

// 路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT, () => {
  console.warn(`Server running on port ${process.env.PORT}`)
})
