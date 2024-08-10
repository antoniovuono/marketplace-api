import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'
import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'

interface FindManySalesByFiltersUseCase {
  page: number
  condition?: TCondition
  paymentMethods?: TPaymentMethods[]
  acceptSwap?: boolean
}

interface FindManySalesByFiltersUseCaseResponse {
  sales: Sale[]
}

export class FindManySalesUseCase {
  constructor(private salesRepository: SaleRepository) {}

  async execute({
    page,
    condition,
    paymentMethods,
    acceptSwap,
  }: FindManySalesByFiltersUseCase): Promise<FindManySalesByFiltersUseCaseResponse> {
    const sales = await this.salesRepository.findManyByFilters(
      page,
      condition,
      paymentMethods,
      acceptSwap,
    )

    return { sales }
  }
}
