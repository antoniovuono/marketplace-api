import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserUseCase = makeGetUserUseCase()

    const users = await getUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ users })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
