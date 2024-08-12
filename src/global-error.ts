import { ZodError } from 'zod'
import { app } from './app'
import { env } from './env'

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.issues })
  }

  if (env.NODE_ENV !== 'production') return console.log(error)

  if (env.NODE_ENV === 'production') {
    // Todo: Here we should log to an external tool like DataDog or Sentry
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
