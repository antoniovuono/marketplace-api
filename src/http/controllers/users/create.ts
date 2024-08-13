import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from '@/use-cases/create-user'
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists-error'
import { createBodySchema } from '@/validations/create-user-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, phone, password } = createBodySchema.parse(
      request.body,
    )

    const usersRepository = new InMemoryUserRepository()
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
  }

  return reply.status(201).send()
}
