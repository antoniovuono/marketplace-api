import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { EditSaleUseCase } from './edit-sale'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'

let editSaleUseCase: EditSaleUseCase
let saleRepository: InMemorySaleRepository
let usersRepository: InMemoryUserRepository

describe('Edit Sale Use Case', () => {
  beforeEach(() => {
    saleRepository = new InMemorySaleRepository()
    usersRepository = new InMemoryUserRepository()
    editSaleUseCase = new EditSaleUseCase(saleRepository)
  })

  it('should able to edit to completely a sale', async () => {
    const { id: userId } = await usersRepository.create({
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

    const { sale } = await editSaleUseCase.execute({
      saleId,
      userId,
      title: 'Title Edited',
      description: 'Description Edited',
      condition: 'USADO',
      price: 140,
      acceptSwap: false,
      paymentMethods: ['BOLETO', 'PIX'],
    })

    expect(sale).toEqual(
      expect.objectContaining({
        title: 'Title Edited',
        description: 'Description Edited',
        condition: 'USADO',
        price: 140,
        accept_swap: false,
        payment_methods: ['BOLETO', 'PIX'],
      }),
    )
  })

  it('should be able to partially edit a sale', async () => {
    const { id: userId } = await usersRepository.create({
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

    const { sale } = await editSaleUseCase.execute({
      saleId,
      userId,
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      acceptSwap: true,
      paymentMethods: ['BOLETO', 'PIX'],
    })

    expect(sale).toEqual(
      expect.objectContaining({
        payment_methods: ['BOLETO', 'PIX'],
      }),
    )
  })

  it('should not be able to edit a sale that does not exist', async () => {
    await expect(async () => {
      await editSaleUseCase.execute({
        saleId: 'non-existent-sale-id',
        userId: '1',
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        acceptSwap: true,
        paymentMethods: ['BOLETO', 'PIX'],
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to edit a sale that does not belong to the user', async () => {
    const { id: userId } = await usersRepository.create({
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
      await editSaleUseCase.execute({
        saleId,
        userId: '2',
        title: 'Title',
        description: 'Description',
        condition: 'NOVO',
        price: 100,
        acceptSwap: true,
        paymentMethods: ['BOLETO', 'PIX'],
      })
    }).rejects.toBeInstanceOf(NotAuthorizedError)
  })
})
