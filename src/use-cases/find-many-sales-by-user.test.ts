import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { FindManySalesByUserUseCase } from './find-many-sales-by-user'
import { ResourceNotFound } from './errors/resource-not-found'

let findManySalesByUser: FindManySalesByUserUseCase
let saleRepository: InMemorySaleRepository
let usersRepository: InMemoryUserRepository

describe('Find Many By Active Use Case', () => {
  beforeEach(() => {
    saleRepository = new InMemorySaleRepository()
    usersRepository = new InMemoryUserRepository()
    findManySalesByUser = new FindManySalesByUserUseCase(
      saleRepository,
      usersRepository,
    )
  })

  it('should return a list of sales by user', async () => {
    const { id: userId } = await usersRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    await saleRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      is_active: false,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: userId,
    })

    for (let i = 0; i < 3; i++) {
      await saleRepository.create({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        is_active: true,
        accept_swap: true,
        payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        user_id: userId,
      })
    }

    const { sales } = await findManySalesByUser.execute({ userId, page: 1 })

    expect(sales.length).toEqual(4)
  })

  it('should throw an error when user is not found', async () => {
    await expect(async () => {
      await findManySalesByUser.execute({ userId: '1', page: 1 })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
