import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { ActivateSaleUseCase } from '../activate-sale'

export function makeActivateSaleUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const activateSaleUseCase = new ActivateSaleUseCase(saleRepository)

  return activateSaleUseCase
}
