import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { EditSaleUseCase } from '../edit-sale'

export function makeEditSaleUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const editSaleUseCase = new EditSaleUseCase(salesRepository)

  return editSaleUseCase
}
