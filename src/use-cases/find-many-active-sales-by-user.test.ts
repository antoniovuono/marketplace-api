import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { FindManyActiveSalesByUserUseCase } from './find-many-active-sales-by-user'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

let findManyActiveSalesByUserUseCase: FindManyActiveSalesByUserUseCase
let saleRepository: InMemorySaleRepository
let userRepository: InMemoryUserRepository

describe('Find Many Active Sales By User', () => {
  beforeEach(() => {
    saleRepository = new InMemorySaleRepository()
    userRepository = new InMemoryUserRepository()
    findManyActiveSalesByUserUseCase = new FindManyActiveSalesByUserUseCase(
      saleRepository,
      userRepository,
    )
  })

  it('should be able return a active sale list by users', async () => {
    const { id: secondaryUserId } = await userRepository.create({
      name: 'John Does',
      email: 'jhon@does.com',
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
      user_id: secondaryUserId,
    })

    const { id: userId } = await userRepository.create({
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

    const { sales } = await findManyActiveSalesByUserUseCase.execute({
      page: 1,
      userId,
    })

    expect(sales.length).toEqual(3)
  })
})
