import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { FindManySalesByActiveUseCase } from './find-many-sales-by-active'

let findManySalesByActiveUseCase: FindManySalesByActiveUseCase
let saleRepository: InMemorySaleRepository
let usersRepository: InMemoryUserRepository

describe('Find Many By Active Use Case', () => {
  beforeEach(() => {
    saleRepository = new InMemorySaleRepository()
    usersRepository = new InMemoryUserRepository()
    findManySalesByActiveUseCase = new FindManySalesByActiveUseCase(
      saleRepository,
    )
  })

  it('should return a list of active sales', async () => {
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

    const { sales } = await findManySalesByActiveUseCase.execute({ page: 1 })

    expect(sales.length).toEqual(3)
  })

  it('should return a paginated list of active sale', async () => {
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

    for (let i = 0; i < 22; i++) {
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

    const { sales } = await findManySalesByActiveUseCase.execute({ page: 2 })

    expect(sales.length).toEqual(2)
  })
})
