import { SaleRepository } from '@/repositories/sale-repository'
import { ResourceNotFound } from './errors/resource-not-found'

interface DeleteSaleUseCaseRequest {
  saleId: string
}

export class DeleteSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ saleId }: DeleteSaleUseCaseRequest): Promise<void> {
    const saleExists = await this.saleRepository.findById(saleId)

    if (!saleExists) throw new ResourceNotFound('Sale')

    return await this.saleRepository.delete(saleId)
  }
}
