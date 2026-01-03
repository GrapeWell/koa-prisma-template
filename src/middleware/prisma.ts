import type Koa from 'koa'
import prisma from '../utils/prisma'

/**
 * Prisma 中间件，将 prisma 客户端注入到 ctx.state 中
 * 这样在 controller 中可以通过 ctx.state.prisma 访问
 */
export function prismaMiddleware(): Koa.Middleware {
  return async (ctx, next) => {
    ctx.state.prisma = prisma
    await next()
  }
}

export default prismaMiddleware
