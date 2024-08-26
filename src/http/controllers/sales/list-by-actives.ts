import { makeFindManyActiveSalesUseCase } from '@/use-cases/factories/make-find-many-active-sales'
import { paginationParamsSchema } from '@/utils/validations/params/pagination-params-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listByActives(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page } = paginationParamsSchema.parse(request.query)

  const findManyActiveSalesUseCase = makeFindManyActiveSalesUseCase()

  const { sales } = await findManyActiveSalesUseCase.execute({
    page,
  })

  return reply.status(200).send({ sales })
}
