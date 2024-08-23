import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeEditSaleUseCase } from '@/use-cases/factories/make-edit-sale-use-case'
import { editSaleBodySchema } from '@/validations/params/edit-sale-body-schema'
import { saleIdParamsSchema } from '@/validations/params/sale-id-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { saleId } = saleIdParamsSchema.parse(request.params)

    const { title, description, condition, price, acceptSwap, paymentMethod } =
      editSaleBodySchema.parse(request.body)

    const editSaleUseCase = makeEditSaleUseCase()

    const { sale } = await editSaleUseCase.execute({
      saleId,
      userId: request.user.sub,
      title,
      description,
      condition,
      price,
      acceptSwap,
      paymentMethods: paymentMethod,
    })

    return reply.status(200).send({ message: 'Sale edit successfully', sale })
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
