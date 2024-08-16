import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeCreateSaleUseCase } from '@/use-cases/factories/make-create-sale-use-case'
import { createSaleBodySchema } from '@/validations/params/create-sale-body-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { title, description, acceptSwap, condition, paymentMethod, price } =
      createSaleBodySchema.parse(request.body)

    const createSaleUseCase = makeCreateSaleUseCase()

    await createSaleUseCase.execute({
      title,
      description,
      acceptSwap,
      condition,
      paymentMethods: paymentMethod,
      userId: request.user.sub,
      price,
    })

    return reply.status(201).send({ message: 'Sale created successfully' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
