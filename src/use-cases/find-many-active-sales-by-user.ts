import { SaleRepository } from '@/repositories/sale-repository'
import { UserRepository } from '@/repositories/user-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface FindManyActiveSalesByUserRequest {
  page: number
  userId: string
}

interface FindManyActiveSalesByUserResponse {
  sales: Sale[]
}

export class FindManyActiveSalesByUserUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    page,
    userId,
  }: FindManyActiveSalesByUserRequest): Promise<FindManyActiveSalesByUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new ResourceNotFound('User')

    const sales = await this.saleRepository.findManyByActiveAndUser(
      userId,
      page,
    )

    return { sales }
  }
}
