import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeFindManyByUserUseCase } from '@/use-cases/factories/make-find-many-by-user-use-case'
import { paginationParamsSchema } from '@/utils/validations/params/pagination-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listByUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { page } = paginationParamsSchema.parse(request.query)

    const findManyByUserUseCase = makeFindManyByUserUseCase()

    const { sales } = await findManyByUserUseCase.execute({
      page,
      userId: request.user.sub,
    })

    return reply.status(200).send({ sales })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
