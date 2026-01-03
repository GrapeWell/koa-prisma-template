import type { Context } from 'koa'
import path from 'node:path'
import log4js from 'log4js'

log4js.configure({
  appenders: {
    error: {
      type: 'file',
      filename: path.join('logs/', 'error/error.log'),
      maxLogSize: 1024 * 1000 * 100,
      backups: 100,
    },

    response: {
      type: 'dateFile',
      filename: path.join('logs/', 'access/response'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },

    console: {
      type: 'console',
      layout: {
        type: 'basic',
      },
    },
  },
  categories: {
    error: { appenders: ['error'], level: 'error' },
    response: { appenders: ['response'], level: 'info' },
    default: { appenders: ['console'], level: 'all' },
  },
})

function formatError(ctx: Context, error: Error) {
  const { method, url } = ctx
  const body = ctx.request.body || {}

  return { method, url, body, error: error.message, stack: error.stack }
}

function formatResponse(ctx: Context, duration: number) {
  const { ip, method, url, response: { status, message }, request: { header: { authorization } } } = ctx
  const body = ctx.request.body
  const user = ctx.state.user

  // 将请求方法，请求路径，请求体，登录用户，请求消耗时间，请求头中的authorization字段即token，响应体中的状态码，消息，以及自定义的响应状态
  return { ip, method, url, body, user, duration: `${duration}ms`, authorization, response: { status, message } }
}

const errorLogger = log4js.getLogger('error')
const responseLogger = log4js.getLogger('response')
const consoleLogger = log4js.getLogger('default')

const logger: Record<string, any> = {}

logger.errorLogger = (ctx: Context, error: Error) => {
  if (ctx && error) {
    const logData = formatError(ctx, error)
    errorLogger.error(JSON.stringify(logData))
  }
}

logger.responseLogger = (ctx: Context, duration: number) => {
  if (ctx) {
    const logData = formatResponse(ctx, duration)
    responseLogger.info(JSON.stringify(logData))
  }
}

logger.log = consoleLogger

export default logger
