import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { createUserBodySchema } from '@/utils/validations/params/create-user-body-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, phone, password } = createUserBodySchema.parse(
      request.body,
    )

    const createUserUseCase = makeCreateUserUseCase()

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
