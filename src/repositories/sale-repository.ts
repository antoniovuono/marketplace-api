import { Prisma, Sale } from '@prisma/client'

export interface SaleRepository {
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
}
