import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      avatar: data.avatar ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.items.find((user) => user.phone === phone) ?? null
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id) ?? null
  }
}
