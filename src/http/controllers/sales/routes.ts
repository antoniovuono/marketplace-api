import { jwtVerifyOnRoutes } from '@/http/middlewares/jwt-verify-on-routes'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { listByActives } from './list-by-actives'
import { listByUser } from './list-by-user'
import { activate } from './activate'
import { deactivate } from './deactivate'
import { listActivesByUser } from './list-actives-by-user'
import { edit } from './edit'
import { remove } from './remove'
import { filterActives } from './filter-actives'

export async function salesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerifyOnRoutes)

  app.post('/sales', create)
  app.get('/sales', listByActives)
  app.get('/sales/filter', filterActives)
  app.get('/sales/my-sales', listByUser)
  app.get('/sales/my-sales/actives', listActivesByUser)
  app.patch('/sales/:saleId/activate', activate)
  app.patch('/sales/:saleId/deactivate', deactivate)
  app.patch('/sales/:saleId/edit', edit)
  app.delete('/sales/:saleId', remove)
}
