import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'

interface CreateSaleUseCaseRequest {
  title: string
  description: string
  condition: 'NOVO' | 'USADO'
  price: number
  acceptSwap: boolean
  paymentMethods: 'BOLETO' | 'PIX' | 'DINHEIRO' | 'CARTAO' | 'DEPOSITO'
  userId: string
}

interface CreateSaleUseCaseResponse {
  sale: Sale
}

export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    title,
    description,
    condition,
    acceptSwap,
    paymentMethods,
    userId,
  }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
    const sale = await this.saleRepository.create({
      title,
      description,
      condition,
      price: 0,
      accept_swap: acceptSwap,
      payment_methods: paymentMethods,
      user_id: userId,
    })

    return { sale }
  }
}
