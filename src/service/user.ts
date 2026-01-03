import prisma from '../utils/prisma'

class UserService {
  /**
   * 获取所有用户
   */
  async findAll() {
    return prisma.user.findMany()
  }

  /**
   * 根据ID获取用户
   */
  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  /**
   * 创建用户
   */
  async create(data: { name: string, email: string }) {
    return prisma.user.create({
      data,
    })
  }
}

const User = new UserService()

export default User
