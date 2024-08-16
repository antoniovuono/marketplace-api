import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@/use-cases/create-user'
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists-error'
import { createUserBodySchema } from '@/validations/params/create-user-body-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, phone, password } = createUserBodySchema.parse(
      request.body,
    )

    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    await createUserUseCase.execute({
      name,
      email,
      phone,
      password,
      avatar: null,
    })

    return reply.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    if (error instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
