import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'
import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'

interface FindManySalesByFiltersUseCase {
  condition?: TCondition
  payment_methods?: TPaymentMethods[]
  accept_swap?: boolean
}

interface FindManySalesByFiltersUseCaseResponse {
  sales: Sale[]
}

export class FindManySalesUseCase {
  constructor(private salesRepository: SaleRepository) {}
}
