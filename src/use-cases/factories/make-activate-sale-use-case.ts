import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { ActivateSaleUseCase } from '../activate-sale'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeActivateSaleUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const usersRepository = new PrismaUsersRepository()
  const activateSaleUseCase = new ActivateSaleUseCase(
    saleRepository,
    usersRepository,
  )

  return activateSaleUseCase
}
