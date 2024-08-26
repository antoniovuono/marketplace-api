import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeFindManyActivesSalesByUserUseCase } from '@/use-cases/factories/make-find-many-active-sales-by-user'
import { paginationParamsSchema } from '@/utils/validations/params/pagination-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listActivesByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page } = paginationParamsSchema.parse(request.query)

    const findManyActivesByUserUseCase = makeFindManyActivesSalesByUserUseCase()

    const sales = await findManyActivesByUserUseCase.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({ sales })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
