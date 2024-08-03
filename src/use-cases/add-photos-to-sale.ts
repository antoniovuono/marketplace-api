import { SalePhotosRepository } from '@/repositories/sale-photos-repository'
import { SaleRepository } from '@/repositories/sale-repository'
import { Photo } from '@prisma/client'

type TPhotoGroupRequest = {
  url: string
}

interface AddPhotosToSaleRequest {
  groupPhotos: TPhotoGroupRequest[]
  saleId: string
}

interface AddPhotosToSaleResponse {
  photos: Photo[]
}

export class AddPhotosToSaleUseCase {
  constructor(
    private salePhotosRepository: SalePhotosRepository,
    private salesRepository: SaleRepository,
  ) {}

  async execute({
    groupPhotos,
    saleId,
  }: AddPhotosToSaleRequest): Promise<AddPhotosToSaleResponse> {
    const saleExists = this.salesRepository.findById(saleId)

    if (!saleExists) throw new Error('Sale not found')

    const photosRegistered =
      await this.salePhotosRepository.findBySaleId(saleId)

    if (photosRegistered.length + groupPhotos.length > 4) {
      throw new Error('You can only add 4 photos per sale')
    }

    const photos = await this.salePhotosRepository.addPhotos(
      groupPhotos.map((photo) => ({
        url: photo.url,
        sale_id: saleId,
      })),
    )

    return { photos }
  }
}
