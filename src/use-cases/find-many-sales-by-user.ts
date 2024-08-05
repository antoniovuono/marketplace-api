import { SaleRepository } from '@/repositories/sale-repository'
import { UserRepository } from '@/repositories/user-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface FindManySalesByUserUseCaseRequest {
  userId: string
  page: number
}

interface FindManySalesByUserUseCaseResponse {
  sales: Sale[]
}

export class FindManySalesByUserUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FindManySalesByUserUseCaseRequest): Promise<FindManySalesByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFound('User')

    const sales = await this.saleRepository.findManyByUser(userId, page)

    return { sales }
  }
}
