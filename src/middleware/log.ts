/**
 * @description 日志中间件，主要用于记录请求的响应时间
 * @param ctx
 * @param next
 */
import type { Context } from 'koa'
import logger from '../utils/log4'

export async function loggerMiddleware(ctx: Context, next: () => Promise<void>) {
  const startTime = Date.now() // 开始时间

  try {
    await next() // 等待后续中间件执行完成

    const duration = Date.now() - startTime // 计算耗时

    logger.responseLogger(ctx, duration)
  }
  catch (error) {
    logger.errorLogger(ctx, error as Error)

    throw error // 继续抛出让错误处理中间件处理
  }
}
