import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { CreateSaleUseCase } from './create-sale'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFound } from './errors/resource-not-found'

let createSaleUseCase: CreateSaleUseCase
let salesRepository: InMemorySaleRepository
let usersRepository: InMemoryUserRepository

describe('Create Sale Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    usersRepository = new InMemoryUserRepository()
    createSaleUseCase = new CreateSaleUseCase(salesRepository, usersRepository)
  })

  it('should be able to create a new sale', async () => {
    const { id: userId } = await usersRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { sale } = await createSaleUseCase.execute({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      acceptSwap: true,
      paymentMethods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      userId,
    })

    expect(sale.id).toEqual(expect.any(String))
  })
  it('should not be able to create a new sale with a non-existent user', async () => {
    await expect(async () => {
      await createSaleUseCase.execute({
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        acceptSwap: true,
        paymentMethods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
        userId: 'non-existent-user-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
