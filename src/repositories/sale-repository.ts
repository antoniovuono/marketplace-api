import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'
import { Prisma, Sale } from '@prisma/client'

export interface SaleRepository {
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  findByUser(saleId: string, userId: string): Promise<Sale | null>
  edit(id: string, data: Prisma.SaleUncheckedUpdateInput): Promise<Sale>
  activate(id: string): Promise<Sale>
  deactivate(id: string): Promise<Sale>
  delete(id: string): Promise<void>
  findManyByActive(page: number): Promise<Sale[]>
  findManyByActiveAndUser(userId: string, page: number): Promise<Sale[]>
  findManyByUser(userId: string, page: number): Promise<Sale[]>
  findManyByFilters(
    page: number,
    condition?: TCondition,
    paymentMethods?: TPaymentMethods[],
    acceptSwap?: boolean,
  ): Promise<Sale[]>
}
