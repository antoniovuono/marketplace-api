import { Photo, Prisma } from '@prisma/client'

export interface SalePhotosRepository {
  addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<number>
  findPhotosBySaleId(saleId: string): Promise<Photo[]>
}
