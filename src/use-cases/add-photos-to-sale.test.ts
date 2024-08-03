import { InMemorySalePhotosRepository } from '@/repositories/in-memory/in-memory-sale-photos-repository'
import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { SalePhotosRepository } from '@/repositories/sale-photos-repository'
import { SaleRepository } from '@/repositories/sale-repository'
import { AddPhotosToSaleUseCase } from './add-photos-to-sale'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { MaxPhotosLimitExceededError } from './errors/max-photos-limit-exceeded-error'

let salePhotosRepository: SalePhotosRepository
let saleRepository: SaleRepository
let addPhotosToSaleUseCase: AddPhotosToSaleUseCase
let usersRepository: InMemoryUserRepository

describe('Add Photos to Sale', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    salePhotosRepository = new InMemorySalePhotosRepository()
    saleRepository = new InMemorySaleRepository()
    addPhotosToSaleUseCase = new AddPhotosToSaleUseCase(
      salePhotosRepository,
      saleRepository,
    )
  })

  it('should add photos to a sale', async () => {
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

    const { photos } = await addPhotosToSaleUseCase.execute({
      groupPhotos: [
        { url: 'http://photo1.com' },
        { url: 'http://photo2.com' },
        { url: 'http://photo3.com' },
        { url: 'http://photo4.com' },
      ],
      saleId,
    })

    expect(photos.length).toBe(4)
  })

  it('should not be able to add photos to a non-existent sale', async () => {
    await expect(async () => {
      await addPhotosToSaleUseCase.execute({
        groupPhotos: [
          { url: 'http://photo1.com' },
          { url: 'http://photo2.com' },
        ],
        saleId: 'non-existent-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to add more than 4 photos to a sale', async () => {
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
      await addPhotosToSaleUseCase.execute({
        groupPhotos: [
          { url: 'http://photo1.com' },
          { url: 'http://photo2.com' },
          { url: 'http://photo3.com' },
          { url: 'http://photo4.com' },
          { url: 'http://photo5.com' },
        ],
        saleId,
      })
    }).rejects.toBeInstanceOf(MaxPhotosLimitExceededError)
  })
})
