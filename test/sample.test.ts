// test/sample.test.ts
import { expect, it, vi } from 'vitest'
import User from '../src/service/user'
import prisma from '../src/utils/__mocks__/prisma'

vi.mock('../src/utils/prisma')

it('createUser should return the generated user', async () => {
  const newUser = { email: 'user@prisma.io', name: 'Prisma Fan' }
  prisma.user.create.mockResolvedValue({
    ...newUser,
    id: 1,
    createdTime: new Date(),
    updatedTime: new Date(),
  })
  const user = await User.create(newUser)
  expect(user).toStrictEqual({ ...newUser, id: 1 })
})
