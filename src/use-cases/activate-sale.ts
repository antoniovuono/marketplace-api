import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface ActivateSaleUseCaseRequest {
  saleId: string
}

interface ActivateSaleUseCaseResponse {
  sale: Sale
}

export class ActivateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    saleId,
  }: ActivateSaleUseCaseRequest): Promise<ActivateSaleUseCaseResponse> {
    const sale = await this.saleRepository.findById(saleId)

    if (!sale) throw new ResourceNotFound('Sale')

    const activatedSale = await this.saleRepository.activate(saleId)

    return { sale: activatedSale }
  }
}
