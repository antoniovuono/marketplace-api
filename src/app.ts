import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { globalErrorHandler } from './http/middlewares/global-error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1h',
  },
})

app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
