import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateSaleUseCase } from '../create-sale'

export function makeCreateSaleUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const userRepository = new PrismaUsersRepository()
  const createSaleUseCase = new CreateSaleUseCase(
    saleRepository,
    userRepository,
  )

  return createSaleUseCase
}
