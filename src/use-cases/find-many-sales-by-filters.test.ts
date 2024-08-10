import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { FindManySalesByFilterUseCase } from './find-many-sales-by-filters'

let findManySalesByFiltersUseCase: FindManySalesByFilterUseCase
let salesRepository: InMemorySaleRepository

describe('Find Many Sales By Filters Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    findManySalesByFiltersUseCase = new FindManySalesByFilterUseCase(
      salesRepository,
    )
  })

  it('should be able to find many active sales if none filter is passed', async () => {
    for (let i = 1; i <= 3; i++) {
      await salesRepository.create({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        accept_swap: true,
        payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        user_id: '1',
      })
    }

    await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      is_active: false,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    const { sales } = await findManySalesByFiltersUseCase.execute({
      page: 1,
    })

    expect(sales).toHaveLength(3)
  })

  it('should be able to find many active sales by condition', async () => {
    await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'USADO',
      price: 100,
      is_active: false,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    const { sales } = await findManySalesByFiltersUseCase.execute({
      page: 1,
      condition: 'NOVO',
    })

    expect(sales).toHaveLength(1)
  })

  it('should be able to find many active sales by payment methods', async () => {
    await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: true,
      payment_methods: ['CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    for (let i = 1; i <= 3; i++) {
      await salesRepository.create({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        accept_swap: true,
        payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        user_id: '1',
      })
    }

    const { sales } = await findManySalesByFiltersUseCase.execute({
      page: 1,
      paymentMethods: ['CARTAO', 'DEPOSITO'],
    })

    expect(sales).toHaveLength(1)
  })

  it('should be able to find many active sales by accept swap', async () => {
    await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: false,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    for (let i = 1; i <= 3; i++) {
      await salesRepository.create({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        accept_swap: true,
        payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        user_id: '1',
      })
    }

    const { sales } = await findManySalesByFiltersUseCase.execute({
      page: 1,
      acceptSwap: true,
    })

    expect(sales).toHaveLength(3)
  })
})
