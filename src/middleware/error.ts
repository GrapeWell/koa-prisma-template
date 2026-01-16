import type { Context } from 'koa'
import { isJSON } from 'src/utils/check'
import 'dotenv/config'

/**
 * 定义统一错误类
 */
export type CommonError = Error & { status?: number, statusCode?: number }

/**
 * 统一响应格式接口
 */
export interface ApiResponse<T = null> {
  message: string
  code: number
  data: T
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
    const err = error as CommonError

    const isValidationError
      = err.name === 'ZodError'
        || err.name === 'ValidationError'

    if (isValidationError) {
      let parsed: unknown = null
      let message = 'Validation Error'

      if (typeof err.message === 'string' && isJSON(err.message)) {
        parsed = JSON.parse(err.message)

        if (Array.isArray(parsed)) {
          message = parsed
            .map((e: any) => `${e.path?.join('.')}: ${e.message}`)
            .join('; ')
        }
      }
      ctx.status = 400
      ctx.body = {
        code: 400,
        message,
        data: null,
      } as ApiResponse
    }
    else {
      const statusCode = err.status || err.statusCode || (ctx.status && ctx.status >= 400 ? ctx.status : 500)

      ctx.status = statusCode
      ctx.body = {
        message: err.message || 'Internal server error',
        code: statusCode,
        data: null,
      } as ApiResponse
    }
  }
}

export default errorMiddleware
