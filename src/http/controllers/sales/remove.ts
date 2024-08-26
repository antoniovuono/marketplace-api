import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeDeleteSaleUseCase } from '@/use-cases/factories/make-delete-sale-use-case'
import { saleIdParamsSchema } from '@/utils/validations/params/sale-id-params-schema'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { saleId } = saleIdParamsSchema.parse(request.params)

    const deleteSaleUseCase = makeDeleteSaleUseCase()

    await deleteSaleUseCase.execute({
      saleId,
      userId: request.user.sub,
    })

    return reply.status(200).send({ message: 'Sale deleted successfully' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotAuthorizedError) {
      return reply.status(403).send({ message: error.message })
    }

    throw error
  }
}
