import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { TCondition } from '@/dtos/condition-dto'
import { TPaymentMethods } from '@/dtos/payment-methods-dto'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface EditSaleUseCaseRequest {
  saleId: string
  userId: string
  title: string | undefined
  description: string | undefined
  condition: TCondition | undefined
  price: number | undefined
  acceptSwap: boolean | undefined
  paymentMethods: TPaymentMethods[] | undefined
}

interface EditSaleUseCaseResponse {
  sale: Sale
}

export class EditSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    saleId,
    userId,
    title,
    description,
    condition,
    price,
    acceptSwap,
    paymentMethods,
  }: EditSaleUseCaseRequest): Promise<EditSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)
    const saleBelongToUser = await this.saleRepository.findByUser(
      saleId,
      userId,
    )

    if (!sale) throw new ResourceNotFound('Sale')
    if (!saleBelongToUser) throw new NotAuthorizedError()

    const editedSale = await this.saleRepository.edit(saleId, {
      title,
      description,
      condition,
      price,
      accept_swap: acceptSwap,
      payment_methods: paymentMethods,
    })

    return { sale: editedSale }
  }
}
