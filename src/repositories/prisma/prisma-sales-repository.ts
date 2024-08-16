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

  async edit(id: string, data: Prisma.SaleUncheckedUpdateInput): Promise<Sale> {
    const sale = await prisma.sale.update({ where: { id }, data })

    return sale
  }

  async activate(id: string): Promise<Sale> {
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        is_active: true,
      },
    })

    return sale
  }

  async deactivate(id: string): Promise<Sale> {
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        is_active: false,
      },
    })

    return sale
  }

  async delete(id: string): Promise<void> {
    await prisma.sale.delete({ where: { id } })
  }

  async findManyByActive(page: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: { is_active: true },
      take: 20,
      skip: (page - 1) * 20,
    })

    return sales
  }

  async findManyByActiveAndUser(userId: string, page: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: { is_active: true, user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return sales
  }

  async findManyByUser(userId: string, page: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return sales
  }

  async findManyByFilters(
    page: number,
    condition?: TCondition,
    paymentMethods?: TPaymentMethods[],
    acceptSwap?: boolean,
  ): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: {
        is_active: true,
        condition,
        payment_methods: {
          hasSome: paymentMethods,
        },
        accept_swap: acceptSwap,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return sales
  }
}
