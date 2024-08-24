import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { FindManySalesByFilterUseCase } from '../find-many-sales-by-filters'

export function makeFilterActivesSalesUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const filterActivesSalesUseCase = new FindManySalesByFilterUseCase(
    salesRepository,
  )
  return filterActivesSalesUseCase
}
