import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

type IPaymentMethods = 'BOLETO' | 'PIX' | 'DINHEIRO' | 'CARTAO' | 'DEPOSITO'

interface EditSaleUseCaseRequest {
  saleId: string
  title: string
  description: string
  condition: 'NOVO' | 'USADO'
  price: number
  acceptSwap: boolean
  paymentMethods: IPaymentMethods[]
}

interface EditSaleUseCaseResponse {
  sale: Sale
}

export class EditSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    saleId,
    title,
    description,
    condition,
    price,
    acceptSwap,
    paymentMethods,
  }: EditSaleUseCaseRequest): Promise<EditSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)

    if (!sale) throw new ResourceNotFound('Sale')

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
