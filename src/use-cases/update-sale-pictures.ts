import { SaleRepository } from '@/repositories/sale-repository'
import { MultipartFile } from '@fastify/multipart'
import { EmptyFieldError } from './errors/empty-field-error'
import { DiskStorage } from '@/utils/storage/DiskStorage'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'
import { SalePhotosRepository } from '@/repositories/sale-photos-repository'
import { Photo } from '@prisma/client'
import { MaxPhotosLimitExceededError } from './errors/max-photos-limit-exceeded-error'

interface ReadableState {
  length: number
}

interface FileWithReadableState {
  _readableState: ReadableState
}

interface UpdateSalePicturesUseCaseRequest {
  userId: string
  saleId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: MultipartFile[] | any
}

interface UpdateSalePicturesUseCaseResponse {
  photos: Photo[]
}

export class UpdateSalePicturesUseCase {
  constructor(
    private salesRepository: SaleRepository,
    private salesPhotosRepository: SalePhotosRepository,
  ) {}

  async execute({
    userId,
    saleId,
    files,
  }: UpdateSalePicturesUseCaseRequest): Promise<UpdateSalePicturesUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)
    const saleBelongToUser = await this.salesRepository.findByUser(
      saleId,
      userId,
    )
    const salesPerPhotos =
      await this.salesPhotosRepository.findPhotosBySaleId(saleId)

    if (!sale) throw new ResourceNotFound('Sale')
    if (!saleBelongToUser) throw new NotAuthorizedError()
    console.log('debug', salesPerPhotos.length)
    if (salesPerPhotos.length >= 4) throw new MaxPhotosLimitExceededError()

    const maxFiles = 4
    let counter = 0

    for await (const file of files) {
      if (
        !(file.file as unknown as FileWithReadableState)._readableState.length
      ) {
        throw new EmptyFieldError()
      }
      if (counter >= maxFiles) {
        throw new MaxPhotosLimitExceededError()
      }

      const upload = new DiskStorage(file, 'sales')

      const filePath = upload.save()

      const data = {
        sale_id: saleId,
        user_id: userId,
        url: filePath,
      }
      await this.salesPhotosRepository.addPhotos([data])

      counter++
    }

    return { photos: salesPerPhotos }
  }
}
