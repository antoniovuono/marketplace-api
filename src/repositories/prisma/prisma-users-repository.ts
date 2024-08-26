import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { phone } })

    return user
  }

  async updateAvatar(file: string, id: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: file,
      },
    })

    return user
  }
}
