import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getActives } from './get-actives'
import { getByUser } from './get-by-user'

export async function salesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerifyOnRoutes)

  app.post('/sales', create)
  app.get('/sales', getActives)
  app.get('/sales/my-sales', getByUser)
}
