import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { DeactivateSaleUseCase } from '../deactivate'

export function makeDeactivateSaleUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const deactivateSaleUseCase = new DeactivateSaleUseCase(saleRepository)

  return deactivateSaleUseCase
}
