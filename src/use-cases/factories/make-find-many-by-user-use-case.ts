import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { FindManySalesByUserUseCase } from '../find-many-sales-by-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeFindManyByUserUseCase() {
  const saleRepository = new PrismaSalesRepository()
  const usersRepository = new PrismaUsersRepository()
  const findManyByUserUseCase = new FindManySalesByUserUseCase(
    saleRepository,
    usersRepository,
  )

  return findManyByUserUseCase
}
