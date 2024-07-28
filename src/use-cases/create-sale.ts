import { SaleRepository } from '@/repositories/sale-repository'
import { UserRepository } from '@/repositories/user-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

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
  constructor(
    private saleRepository: SaleRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    title,
    description,
    condition,
    price,
    acceptSwap,
    paymentMethods,
    userId,
  }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) throw new ResourceNotFound('User')

    const sale = await this.saleRepository.create({
      title,
      description,
      condition,
      price,
      accept_swap: acceptSwap,
      payment_methods: paymentMethods,
      user_id: userId,
    })

    return { sale }
  }
}
