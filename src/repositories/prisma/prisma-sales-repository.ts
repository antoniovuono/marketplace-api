import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'
import { Prisma, Sale } from '@prisma/client'
import { SaleRepository } from '../sale-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSalesRepository implements SaleRepository {
  async create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
    const sale = await prisma.sale.create({ data })

    return sale
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = await prisma.sale.findUnique({ where: { id } })

    return sale
  }
}
