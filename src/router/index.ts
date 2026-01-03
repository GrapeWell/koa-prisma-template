import { SwaggerRouter } from 'koa-swagger-decorator'
import { UserController } from '../controller/user'

const router = new SwaggerRouter({
  spec: {
    info: {
      title: 'Server API',
      description: 'API documentation for Server',
      version: '1.0.0',
    },
  },
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
})

// 设置路由前缀
router.prefix('/api')

// 应用 swagger 文档路由
router.swagger()

// 注册控制器路由
router.applyRoute(UserController)

export default router
