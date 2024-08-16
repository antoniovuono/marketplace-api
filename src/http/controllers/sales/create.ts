import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateSaleUseCase } from '@/use-cases/create-sale'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { createSaleBodySchema } from '@/validations/params/create-sale-body-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { title, description, acceptSwap, condition, paymentMethod, price } =
      createSaleBodySchema.parse(request.body)

    const saleRepository = new PrismaSalesRepository()
    const userRepository = new PrismaUsersRepository()
    const createSaleUseCase = new CreateSaleUseCase(
      saleRepository,
      userRepository,
    )

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
