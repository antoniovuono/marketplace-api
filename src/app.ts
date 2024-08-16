import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { ZodError } from 'zod'
import { salesRoutes } from './http/controllers/sales/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1h',
  },
})

app.register(userRoutes)
app.register(salesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') console.error(error)

  if (env.NODE_ENV === 'production') {
    console.log('log error to external service like datadog or sentry')
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
