import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface DeactivateSaleUseCaseRequest {
  saleId: string
  userId: string
}

interface DeactivateSaleUseCaseResponse {
  sale: Sale
}

export class DeactivateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    saleId,
    userId,
  }: DeactivateSaleUseCaseRequest): Promise<DeactivateSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)
    const saleBelongToUser = await this.saleRepository.findByUser(
      saleId,
      userId,
    )

    if (!sale) throw new ResourceNotFound('Sale')
    if (!saleBelongToUser) throw new NotAuthorizedError()

    const activatedSale = await this.saleRepository.deactivate(saleId)

    return { sale: activatedSale }
  }
}
