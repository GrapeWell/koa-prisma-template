import type { Context } from 'koa'
import type { ParsedArgs } from 'koa-swagger-decorator'
import type { ICreateUserReq } from '../schema/user'
import { body, routeConfig } from 'koa-swagger-decorator'
import {
  CreateUserReq,

} from '../schema/user'
import User from '../service/user'

class UserController {
  @routeConfig({
    method: 'get',
    path: '/users',
    summary: 'Get all users',
    description: 'example of api',
    tags: ['USER'],
  })

  async getUsers(ctx: Context) {
    const users = await User.findAll()
    ctx.body = { users }
  }

  @routeConfig({
    method: 'get',
    path: '/users/{id}',
    summary: 'Get user by ID',
    description: 'example of api',
    tags: ['USER'],
  })
  async getUserById(ctx: Context) {
    const id = Number(ctx.params.id)
    const user = await User.findById(id)
    ctx.body = { user }
  }

  @routeConfig({
    method: 'post',
    path: '/users',
    summary: 'Create a new user',
    description: 'example of api',
    tags: ['USER'],
  })
  @body(CreateUserReq)
  async createUser(ctx: Context, args: ParsedArgs<ICreateUserReq>) {
    const { name, email } = args.body as ICreateUserReq
    const newUser = await User.create({ name, email })
    ctx.body = { user: newUser }
  }
}

export { UserController }
