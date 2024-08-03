import { Photo, Prisma } from '@prisma/client'

export interface SalePhotosRepository {
  addPhotos(data: Prisma.PhotoCreateManyInput[]): Promise<Photo[]>
  findBySaleId(saleId: string): Promise<Photo[]>
}
