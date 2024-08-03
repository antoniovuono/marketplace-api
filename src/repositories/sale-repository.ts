import { Prisma, Sale } from '@prisma/client'

export interface SaleRepository {
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
  getMany(page: number): Promise<Sale[]>
  findById(id: string): Promise<Sale | null>
}
