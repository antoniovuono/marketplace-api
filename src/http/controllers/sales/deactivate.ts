import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeDeactivateSaleUseCase } from '@/use-cases/factories/make-deactivate-sale-use-case'
import { activateAndDeactivateParamsSchema } from '@/validations/params/activate-and-deactivate-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deactivate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { saleId } = activateAndDeactivateParamsSchema.parse(request.params)

    const deactivateSaleUseCase = makeDeactivateSaleUseCase()

    await deactivateSaleUseCase.execute({ saleId, userId: request.user.sub })

    return reply.status(200).send({ message: 'Sale deactivate' })
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
