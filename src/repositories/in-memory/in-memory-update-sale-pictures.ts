import { Prisma, Photo } from '@prisma/client'
import { SalePhotosRepository } from '../sale-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUpdateSalePictures implements SalePhotosRepository {
  public items: Photo[] = []

  async addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<void> {
    data.map((photo) => {
      const newPhoto: Photo = {
        id: randomUUID(),
        user_id: photo.user_id,
        sale_id: photo.sale_id,
        url: photo.url,
        created_at: new Date(),
      }

      return this.items.push(newPhoto)
    })
  }

  async findPhotosBySaleId(saleId: string): Promise<Photo[]> {
    return this.items.filter((photo) => photo.sale_id === saleId)
  }
}
