import type { PrismaClient } from '../generated/prisma/client'

declare module 'koa' {
  interface DefaultState {
    prisma: PrismaClient
  }
}
