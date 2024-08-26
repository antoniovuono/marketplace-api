import { makeFilterActivesSalesUseCase } from '@/use-cases/factories/make-filter-actives-sales-use-case'
import { filterSalesQuerySchema } from '@/utils/validations/params/filter-sales-query-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function filterActives(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, condition, paymentMethods, acceptSwap } =
    filterSalesQuerySchema.parse(request.query)

  const filterActivesSalesUseCase = makeFilterActivesSalesUseCase()

  const { sales } = await filterActivesSalesUseCase.execute({
    page,
    condition,
    paymentMethods,
    acceptSwap,
  })

  return reply.status(200).send({ sales })
}
