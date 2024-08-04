import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface DeactivateSaleUseCaseRequest {
  saleId: string
}

interface DeactivateSaleUseCaseResponse {
  sale: Sale
}

export class DeactivateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    saleId,
  }: DeactivateSaleUseCaseRequest): Promise<DeactivateSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)

    if (!sale) throw new ResourceNotFound('Sale')

    const activatedSale = await this.saleRepository.deactivate(saleId)

    return { sale: activatedSale }
  }
}
