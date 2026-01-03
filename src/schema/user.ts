import { z } from 'koa-swagger-decorator'

export const CreateUserReq = z.object({
  name: z.string().min(1).max(100),
  email: z.string(),
})

export type ICreateUserReq = z.infer<typeof CreateUserReq>
