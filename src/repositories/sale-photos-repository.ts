import { Photo, Prisma } from '@prisma/client'

export interface SalePhotosRepository {
  addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<void>
  findPhotosBySaleId(saleId: string): Promise<Photo[]>
}
