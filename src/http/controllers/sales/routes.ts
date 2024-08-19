import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { listByActives } from './list-by-actives'
import { listByUser } from './list-by-user'
import { activate } from './activate'
import { deactivate } from './deactivate'

export async function salesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerifyOnRoutes)

  app.post('/sales', create)
  app.get('/sales', listByActives)
  app.get('/sales/my-sales', listByUser)
  app.patch('/sales/:saleId/activate', activate)
  app.patch('/sales/:saleId/deactivate', deactivate)
}
