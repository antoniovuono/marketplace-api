import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { GetSalesUseCase } from './get-sales'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

let getSalesUseCase: GetSalesUseCase
let usersRepository: InMemoryUserRepository
let salesRepository: InMemorySaleRepository

describe('Get Sales Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    salesRepository = new InMemorySaleRepository()
    getSalesUseCase = new GetSalesUseCase(salesRepository)
  })

  it('should be able to get sales', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    for (let i = 0; i <= 21; i++) {
      await salesRepository.create({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        accept_swap: true,
        payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        user_id: userId,
      })
    }

    const { sales } = await getSalesUseCase.execute({
      page: 1,
    })

    expect(sales.length).toBe(20)
  })
})
