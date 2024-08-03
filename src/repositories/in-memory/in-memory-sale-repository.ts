import { Prisma, Sale } from '@prisma/client'
import { SaleRepository } from '../sale-repository'
import { randomUUID } from 'node:crypto'

export class InMemorySaleRepository implements SaleRepository {
  public items: Sale[] = []

  async create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
    const sale = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      condition: data.condition,
      price: data.price,
      accept_swap: data.accept_swap,
      is_active: Boolean(data.is_active),
      payment_methods: Array.isArray(data.payment_methods)
        ? data.payment_methods
        : [],
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(sale)

    return sale
  }

  async getMany(page: number): Promise<Sale[]> {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Sale | null> {
    return this.items.find((sale) => sale.id === id) ?? null
  }
}
