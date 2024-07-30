import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'

interface GetSalesUseCaseRequest {
  page: number
}

interface GetSalesUseCaseResponse {
  sales: Sale[]
}

export class GetSalesUseCase {
  constructor(private salesRepository: SaleRepository) {}

  async execute({
    page,
  }: GetSalesUseCaseRequest): Promise<GetSalesUseCaseResponse> {
    const sales = await this.salesRepository.getMany(page)

    return { sales }
  }
}
