import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { GetUserUseCase } from '@/use-cases/get-user'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

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
