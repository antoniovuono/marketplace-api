import { SalePhotosRepository } from '@/repositories/sale-photos-repository'
import { SaleRepository } from '@/repositories/sale-repository'
import { Photo } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { MaxPhotosLimitExceededError } from './errors/max-photos-limit-exceeded-error'

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
    const saleExists = await this.salesRepository.findById(saleId)

    if (!saleExists) throw new ResourceNotFound('Sale')

    const photosRegistered =
      await this.salePhotosRepository.findBySaleId(saleId)

    if (photosRegistered.length + groupPhotos.length > 4) {
      throw new MaxPhotosLimitExceededError()
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
