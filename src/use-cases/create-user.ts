import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  avatar: string | null
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatar,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(email)
    const phoneAlreadyRegistered = await this.userRepository.findByPhone(phone)

    if (emailAlreadyRegistered) throw new Error('Email already registered')
    if (phoneAlreadyRegistered) throw new Error('Phone already registered')
    if (password.length < 8)
      throw new Error('Password must have at least 8 characters')

    const user = await this.userRepository.create({
      name,
      email,
      phone,
      password,
      avatar,
    })

    return { user }
  }
}
