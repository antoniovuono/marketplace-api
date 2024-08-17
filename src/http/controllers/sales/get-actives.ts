import { makeFindManyActiveSalesUseCase } from '@/use-cases/factories/make-find-many-active-sales'
import { getActivesQuerySchema } from '@/validations/params/get-actives-query-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getActives(request: FastifyRequest, reply: FastifyReply) {
  const { page } = getActivesQuerySchema.parse(request.query)

  const findManyActiveSalesUseCase = makeFindManyActiveSalesUseCase()

  const { sales } = await findManyActiveSalesUseCase.execute({
    page,
  })

  return reply.status(200).send({ sales })
}
