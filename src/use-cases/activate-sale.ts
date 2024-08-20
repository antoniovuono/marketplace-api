import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { UserRepository } from '@/repositories/user-repository'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface ActivateSaleUseCaseRequest {
  saleId: string
  userId: string
}

interface ActivateSaleUseCaseResponse {
  sale: Sale
}

export class ActivateSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    saleId,
    userId,
  }: ActivateSaleUseCaseRequest): Promise<ActivateSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)
    const saleBelongToUser = await this.saleRepository.findByUser(
      saleId,
      userId,
    )

    if (!sale) throw new ResourceNotFound('Sale')
    if (!saleBelongToUser) throw new NotAuthorizedError()

    const activatedSale = await this.saleRepository.activate(saleId)

    return { sale: activatedSale }
  }
}
