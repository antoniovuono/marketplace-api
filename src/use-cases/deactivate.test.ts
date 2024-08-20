import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { DeactivateSaleUseCase } from './deactivate'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { NotAuthorizedError } from './errors/not-authorized-error'

let deactivateSaleUseCase: DeactivateSaleUseCase
let usersRepository: InMemoryUserRepository
let salesRepository: InMemorySaleRepository

describe('Deactivate Sale Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    usersRepository = new InMemoryUserRepository()
    deactivateSaleUseCase = new DeactivateSaleUseCase(salesRepository)
  })

  it('should be able to deactivate a sale', async () => {
    const { id: saleId } = await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: false,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    const { sale } = await deactivateSaleUseCase.execute({
      saleId,
      userId: '1',
    })

    expect(sale.is_active).toBe(false)
  })
  it('should not be able to deactivate a non-existent sale', async () => {
    await expect(async () => {
      await deactivateSaleUseCase.execute({
        saleId: 'non-existent-sale-id',
        userId: '1',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to deactivate a sale that does not belong to the user', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { id: userId2 } = await usersRepository.create({
      name: 'John Doe 2',
      email: 'jhon2@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { id: saleId } = await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: false,
      is_active: false,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: userId,
    })

    await expect(async () => {
      await deactivateSaleUseCase.execute({
        saleId,
        userId: userId2,
      })
    }).rejects.toBeInstanceOf(NotAuthorizedError)
  })
})
