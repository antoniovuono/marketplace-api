import { PrismaSalesPhotosRepository } from '@/repositories/prisma/prisma-sales-photos-repository'
import { ListSalesPicturesUseCase } from '../list-sales-pictures'

export function makeListPicturesPerSale() {
  const salesPhotosRepository = new PrismaSalesPhotosRepository()
  const salesPhotosUseCase = new ListSalesPicturesUseCase(salesPhotosRepository)

  return salesPhotosUseCase
}
