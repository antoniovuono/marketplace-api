import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'
import { authenticateBodySchema } from '@/validations/params/authenticate-body-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const jwtToken = await reply.jwtSign(
      { email: user.email },
      { sign: { sub: user.id } },
    )

    return reply
      .status(200)
      .send({ message: 'User authenticated successfully', token: jwtToken })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
