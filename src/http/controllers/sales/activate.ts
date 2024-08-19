import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeActivateSaleUseCase } from '@/use-cases/factories/make-activate-sale-use-case'
import { activateAndDeactivateParamsSchema } from '@/validations/params/activate-and-deactivate-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function activate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { saleId } = activateAndDeactivateParamsSchema.parse(request.params)

    const activateSaleUseCase = makeActivateSaleUseCase()

    await activateSaleUseCase.execute({ saleId })

    return reply.status(200).send({ message: 'Sale activated' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
