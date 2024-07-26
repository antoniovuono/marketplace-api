import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { ResourceAlreadyExists } from './errors/resource-already-exists-error'
import { PasswordSizeError } from './errors/password-size-error'

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
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatar,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(email)
    const phoneAlreadyRegistered = await this.userRepository.findByPhone(phone)

    if (emailAlreadyRegistered) throw new ResourceAlreadyExists('Email')
    if (phoneAlreadyRegistered) throw new ResourceAlreadyExists('Phone')
    if (password.length < 8) throw new PasswordSizeError()

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
