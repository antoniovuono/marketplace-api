import { Prisma, Sale } from '@prisma/client'

export interface SaleRepository {
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  edit(id: string, data: Prisma.SaleUncheckedUpdateInput): Promise<Sale>
  activate(id: string): Promise<Sale>
  deactivate(id: string): Promise<Sale>
  delete(id: string): Promise<void>
  findMany(page: number): Promise<Sale[]>
}
