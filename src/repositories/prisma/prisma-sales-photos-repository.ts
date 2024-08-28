import { Photo, Prisma } from '@prisma/client'
import { SalePhotosRepository } from '../sale-photos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSalesPhotosRepository implements SalePhotosRepository {
  async addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<number> {
    const photos = await prisma.photo.createMany({ data })

    return photos.count
  }

  async findPhotosBySaleId(saleId: string): Promise<Photo[]> {
    const photos = await prisma.photo.findMany({
      where: {
        sale_id: saleId,
      },
    })

    return photos
  }
}
