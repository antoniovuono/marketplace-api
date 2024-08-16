import { FastifyInstance } from 'fastify'
import { create } from './create'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.get('/users/me', { onRequest: [jwtVerifyOnRoutes] }, profile)

  app.post('/users/session', authenticate)
}
