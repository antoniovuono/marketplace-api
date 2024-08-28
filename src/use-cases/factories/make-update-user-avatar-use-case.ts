import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserAvatarUseCase } from '../update-user-avatar'

export function makeUpdateUserAvatarUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateAvatarUserUseCase = new UpdateUserAvatarUseCase(usersRepository)

  return updateAvatarUserUseCase
}
