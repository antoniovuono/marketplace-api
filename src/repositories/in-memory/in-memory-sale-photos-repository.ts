import { Photo, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SalePhotosRepository } from '../sale-photos-repository'

export class InMemorySalePhotosRepository implements SalePhotosRepository {
  public item: Photo[] = []

  async addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<void> {
    data.forEach((photo) => {
      const registerPhoto: Photo = {
        id: randomUUID(),
        user_id: photo.user_id,
        sale_id: photo.sale_id,
        url: photo.url,
        created_at: new Date(),
      }

      this.item.push(registerPhoto)
    })
  }

  async findPhotosBySaleId(saleId: string): Promise<Photo[]> {
    return this.item.filter((photos) => photos.sale_id === saleId)
  }
}
