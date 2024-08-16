import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function salesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerifyOnRoutes)

  app.post('/sales', create)
}
