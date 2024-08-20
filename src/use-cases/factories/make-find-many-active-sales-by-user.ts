import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindManyActiveSalesByUserUseCase } from '../find-many-active-sales-by-user'

export function makeFindManyActivesSalesByUserUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const usersRepository = new PrismaUsersRepository()

  const findManyActiveSalesByUserUseCase = new FindManyActiveSalesByUserUseCase(
    salesRepository,
    usersRepository,
  )

  return findManyActiveSalesByUserUseCase
}
