import type { PrismaClient } from '../../generated/prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
  // eslint-disable-next-line ts/no-use-before-define
  mockReset(prisma)
})

const prisma = mockDeep<PrismaClient>()
export default prisma
