import { InMemorySalePhotosRepository } from '@/repositories/in-memory/in-memory-sale-photos-repository'
import { InMemorySaleRepository } from '@/repositories/in-memory/in-memory-sale-repository'
import { UpdateSalePicturesUseCase } from './update-sale-pictures'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorizedError } from './errors/not-authorized-error'

let salesRepository: InMemorySaleRepository
let salesPhotosRepository: InMemorySalePhotosRepository
let updateSalePicturesUseCase: UpdateSalePicturesUseCase

describe('Update Sale Pictures Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySaleRepository()
    salesPhotosRepository = new InMemorySalePhotosRepository()
    updateSalePicturesUseCase = new UpdateSalePicturesUseCase(
      salesRepository,
      salesPhotosRepository,
    )
  })

  it('should throw an error if sale does not exist', async () => {
    await expect(
      updateSalePicturesUseCase.execute({
        userId: '1',
        saleId: '1',
        files: [],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should throw and error if sale if sale does not belong to user', async () => {
    const { id: saleId } = await salesRepository.create({
      title: 'Title',
      description: 'Description',
      condition: 'NOVO',
      price: 100,
      accept_swap: true,
      payment_methods: ['BOLETO', 'PIX', 'DINHEIRO', 'CARTAO', 'DEPOSITO'],
      user_id: '1',
    })

    await expect(
      updateSalePicturesUseCase.execute({
        userId: 'other-id',
        saleId,
        files: [],
      }),
    ).rejects.toBeInstanceOf(NotAuthorizedError)
  })
})
