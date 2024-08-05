import { SaleRepository } from '@/repositories/sale-repository'
import { Sale } from '@prisma/client'

interface FindManyByActiveRequest {
  page: number
}

interface FindManyByActiveResponse {
  sales: Sale[]
}

export class FindManyByActiveUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute({
    page,
  }: FindManyByActiveRequest): Promise<FindManyByActiveResponse> {
    const sales = await this.saleRepository.findManyByActive(page)

    return { sales }
  }
}
