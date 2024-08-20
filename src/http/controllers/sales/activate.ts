import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeActivateSaleUseCase } from '@/use-cases/factories/make-activate-sale-use-case'
import { activateAndDeactivateParamsSchema } from '@/validations/params/activate-and-deactivate-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function activate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { saleId } = activateAndDeactivateParamsSchema.parse(request.params)

    const activateSaleUseCase = makeActivateSaleUseCase()

    await activateSaleUseCase.execute({ saleId, userId: request.user.sub })

    return reply.status(200).send({ message: 'Sale activated' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotAuthorizedError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
