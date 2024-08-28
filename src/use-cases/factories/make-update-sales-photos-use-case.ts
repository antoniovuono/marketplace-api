import { PrismaSalesPhotosRepository } from '@/repositories/prisma/prisma-sales-photos-repository'
import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { UpdateSalePicturesUseCase } from '../update-sale-pictures'

export function makeUpdateSalesPhotosUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const salesPhotosRepository = new PrismaSalesPhotosRepository()
  const updateSalePicturesUseCase = new UpdateSalePicturesUseCase(
    salesRepository,
    salesPhotosRepository,
  )

  return updateSalePicturesUseCase
}
