import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { FindManySalesByActiveUseCase } from '../find-many-sales-by-active'

export function makeFindManyActiveSalesUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const findManySalesByActiveUseCase = new FindManySalesByActiveUseCase(
    saleRepository,
  )

  return findManySalesByActiveUseCase
}
