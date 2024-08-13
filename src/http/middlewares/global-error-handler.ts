import { env } from '@/env'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export function globalErrorHandler(
  error: FastifyError | ZodError | Error,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.issues })
  }

  if (env.NODE_ENV !== 'production') return console.log(error)
  // Todo: Here we should log to an external tool like DataDog or Sentry
  if (env.NODE_ENV === 'production') return console.log(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
}
