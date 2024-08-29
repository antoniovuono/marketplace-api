import { makeListPicturesPerSale } from '@/use-cases/factories/make-list-pictures-per-sale'
import { saleIdParamsSchema } from '@/utils/validations/params/sale-id-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listPictures(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { saleId } = saleIdParamsSchema.parse(request.params)

  const listSalesPicturesUseCase = makeListPicturesPerSale()

  const photos = await listSalesPicturesUseCase.execute({ saleId })

  return reply.status(200).send(photos)
}
