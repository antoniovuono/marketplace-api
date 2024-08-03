import { Prisma, Photo } from '@prisma/client'
import { SalePhotosRepository } from '../sale-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemorySalePhotosRepository implements SalePhotosRepository {
  public item: Photo[] = []

  async addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<Photo[]> {
    const newPhotos = data.map((photo) => {
      const registerPhoto: Photo = {
        id: randomUUID(),
        sale_id: photo.sale_id,
        url: photo.url,
        created_at: new Date(),
      }

      this.item.push(registerPhoto)
      return registerPhoto
    })

    return newPhotos
  }

  async findBySaleId(saleId: string): Promise<Photo[]> {
    return this.item.filter((photos) => photos.sale_id === saleId)
  }
}
