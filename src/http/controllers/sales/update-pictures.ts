import { EmptyFieldError } from '@/use-cases/errors/empty-field-error'
import { MaxPhotosLimitExceededError } from '@/use-cases/errors/max-photos-limit-exceeded-error'
import { NotAuthorizedError } from '@/use-cases/errors/not-authorized-error'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeUpdateSalesPhotosUseCase } from '@/use-cases/factories/make-update-sales-photos-use-case'
import { saleIdParamsSchema } from '@/utils/validations/params/sale-id-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updatePictures(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { saleId } = saleIdParamsSchema.parse(request.params)
    const files = request.files()

    const updateSalePicturesUseCase = makeUpdateSalesPhotosUseCase()

    await updateSalePicturesUseCase.execute({
      userId: request.user.sub,
      saleId,
      files,
    })

    return reply.code(200).send({ message: 'Pictures updated' })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.code(404).send({ message: error.message })
    }

    if (error instanceof EmptyFieldError) {
      return reply.code(400).send({ message: error.message })
    }

    if (error instanceof NotAuthorizedError) {
      return reply.code(403).send({ message: error.message })
    }

    if (error instanceof MaxPhotosLimitExceededError) {
      return reply.code(400).send({ message: error.message })
    }

    throw error
  }
}
