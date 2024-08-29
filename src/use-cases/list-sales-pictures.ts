import { SalePhotosRepository } from '@/repositories/sale-photos-repository'
import { Photo } from '@prisma/client'

interface ListSalesPicturesUseCaseRequest {
  saleId: string
}

interface ListSalesPicturesUseCaseResponse {
  photos: Photo[]
}

export class ListSalesPicturesUseCase {
  constructor(private salesPhotosRepository: SalePhotosRepository) {}

  async execute({
    saleId,
  }: ListSalesPicturesUseCaseRequest): Promise<ListSalesPicturesUseCaseResponse> {
    const photos = await this.salesPhotosRepository.findPhotosBySaleId(saleId)

    console.log(photos)

    return {
      photos,
    }
  }
}
