import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { DeleteSaleUseCase } from './delete-sale'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'

let deleteSaleUseCase: DeleteSaleUseCase
let userRepository: InMemoryUserRepository
let saleRepository: InMemorySaleRepository

describe('Delete Sale Use Case', () => {
  beforeEach(() => {
    saleRepository = new InMemorySaleRepository()
    userRepository = new InMemoryUserRepository()
    deleteSaleUseCase = new DeleteSaleUseCase(saleRepository)
  })

  it('should be able to delete a sale', async () => {
    const { id: userId } = await userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { id: saleId } = await saleRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: userId,
    })

    await deleteSaleUseCase.execute({
      saleId,
      userId,
    })

    const sale = await saleRepository.findById(saleId)

    expect(sale).toEqual(null)
  })

  it('should not be able to delete a non-existent sale', async () => {
    await expect(async () => {
      await deleteSaleUseCase.execute({
        saleId: 'non-existent-sale',
        userId: '1',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to delete a sale that does not belong to the user', async () => {
    const { id: userId } = await userRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'jhon@doe.com',
      phone: '41999998888',
      password: 'password',
      avatar: null,
    })

    const { id: saleId } = await saleRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: userId,
    })

    await expect(async () => {
      await deleteSaleUseCase.execute({
        saleId,
        userId: '2',
      })
    }).rejects.toBeInstanceOf(NotAuthorizedError)
  })
})
