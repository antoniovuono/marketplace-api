import { FastifyInstance } from 'fastify'
import { create } from './create'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'
import { updateAvatar } from './update-avatar'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/users/session', authenticate)
  app.get('/users/me', { onRequest: [jwtVerifyOnRoutes] }, profile)
  app.patch('/users/:userId/avatar', updateAvatar)
}
