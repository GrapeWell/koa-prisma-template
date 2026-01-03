import type { Context } from 'koa'
import process from 'node:process'
import 'dotenv/config'

/**
 * 统一响应格式接口
 */
export interface ApiResponse<T = null> {
  message: string
  code: number
  data: T
}

/**
 * 自定义业务错误类
 */
export class AppError extends Error {
  code: number
  data: unknown

  constructor(message: string, code = 500, data: unknown = null) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.data = data
  }
}

/**
 * 错误处理中间件
 * 统一捕获错误并返回标准格式响应
 */
export async function errorMiddleware(ctx: Context, next: () => Promise<void>) {
  try {
    await next()
  }
  catch (error) {
    // 处理自定义业务错误
    if (error instanceof AppError) {
      ctx.status = error.code >= 400 && error.code < 600 ? error.code : 500
      ctx.body = {
        message: error.message,
        code: error.code,
        data: error.data,
      } as ApiResponse
      return
    }

    // 处理其他错误
    const err = error as Error
    const statusCode = ctx.status && ctx.status >= 400 ? ctx.status : 500

    ctx.status = statusCode
    ctx.body = {
      message: err.message || 'Internal server error',
      code: statusCode,
      data: null,
    } as ApiResponse

    // 在开发环境下可以打印错误堆栈
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }
  }
}

export default errorMiddleware
