import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { globalErrorHandler } from './http/middlewares/global-error-handler'

export const app = fastify()

app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
