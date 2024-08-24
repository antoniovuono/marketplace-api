import { SaleRepository } from '@/repositories/sale-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'

interface DeleteSaleUseCaseRequest {
  saleId: string
  userId: string
}

export class DeleteSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({ saleId, userId }: DeleteSaleUseCaseRequest): Promise<void> {
    const saleExists = await this.saleRepository.findById(saleId)
    const saleBelongToUser = await this.saleRepository.findByUser(
      saleId,
      userId,
    )

    if (!saleExists) throw new ResourceNotFound('Sale')
    if (!saleBelongToUser) throw new NotAuthorizedError()

    return await this.saleRepository.delete(saleId)
  }
}
