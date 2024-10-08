import { Condition, Prisma, Sale } from '@prisma/client'
import { SaleRepository } from '../sale-repository'
import { randomUUID } from 'node:crypto'
import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'

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
      is_active: data.is_active ?? true,
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

  async findById(id: string): Promise<Sale | null> {
    return this.items.find((sale) => sale.id === id) ?? null
  }

  async findByUser(saleId: string, userId: string): Promise<Sale | null> {
    return (
      this.items.find(
        (sale) => sale.user_id === userId && sale.id === saleId,
      ) ?? null
    )
  }

  async edit(id: string, data: Prisma.SaleUncheckedUpdateInput): Promise<Sale> {
    const saleIndex = this.items.findIndex((sale) => sale.id === id)

    const sale = this.items[saleIndex]

    const updatedSale = {
      id: sale.id,
      user_id: sale.user_id,
      title: String(data.title) ?? sale.title,
      description: String(data.description) ?? sale.description,
      condition: (data.condition as Condition) ?? sale.condition,
      price: Number(data.price) ?? sale.price,
      accept_swap: Boolean(data.accept_swap) ?? sale.accept_swap,
      payment_methods: Array.isArray(data.payment_methods)
        ? data.payment_methods
        : sale.payment_methods,
      is_active: sale.is_active,
      created_at: sale.created_at,
      updated_at: new Date(),
    }

    this.items[saleIndex] = updatedSale

    return updatedSale
  }

  async activate(id: string): Promise<Sale> {
    const saleIndex = this.items.findIndex((sale) => sale.id === id)

    const sale = this.items[saleIndex]

    const activateSale = {
      ...sale,
      is_active: true,
    }

    this.items[saleIndex] = activateSale

    return activateSale
  }

  async deactivate(id: string): Promise<Sale> {
    const saleIndex = this.items.findIndex((sale) => sale.id === id)

    const sale = this.items[saleIndex]

    const deactivateSale = {
      ...sale,
      is_active: false,
    }

    this.items[saleIndex] = deactivateSale

    return deactivateSale
  }

  async delete(id: string): Promise<void> {
    const saleIndex = this.items.findIndex((sale) => sale.id === id)

    this.items.splice(saleIndex, 1)
  }

  async findManyByActive(page: number): Promise<Sale[]> {
    const activatedSales = this.items.filter((sale) => sale.is_active === true)

    return activatedSales.slice((page - 1) * 20, page * 20)
  }

  async findManyByUser(userId: string, page: number): Promise<Sale[]> {
    const userSales = this.items.filter((sale) => sale.user_id === userId)

    return userSales.slice((page - 1) * 20, page * 20)
  }

  async findManyByActiveAndUser(userId: string, page: number): Promise<Sale[]> {
    const sales = this.items.filter(
      (sale) => sale.user_id === userId && sale.is_active === true,
    )

    return sales.slice((page - 1) * 20, page * 20)
  }

  async findManyByFilters(
    page: number,
    condition?: TCondition,
    paymentMethods?: TPaymentMethods[],
    acceptSwap?: boolean,
  ): Promise<Sale[]> {
    const sales = this.items.filter((sale) => {
      let matches = sale.is_active

      if (condition !== undefined) {
        matches = matches && sale.condition === condition
      }

      if (paymentMethods !== undefined) {
        matches =
          matches &&
          paymentMethods.length === sale.payment_methods.length &&
          paymentMethods.every((method) =>
            sale.payment_methods.includes(method),
          ) &&
          sale.payment_methods.every((method) =>
            paymentMethods.includes(method),
          )
      }

      if (acceptSwap !== undefined) {
        matches = matches && sale.accept_swap === acceptSwap
      }

      return matches
    })

    return sales.slice((page - 1) * 20, page * 20)
  }
}
