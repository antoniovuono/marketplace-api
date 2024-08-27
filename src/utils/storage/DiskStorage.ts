import path from 'path'
import fs from 'fs'
import { MultipartFile } from '@fastify/multipart'

export class DiskStorage {
  private uploadPath: string
  private filePath: string
  private file: MultipartFile

  constructor(file: MultipartFile) {
    this.uploadPath = path.resolve(__dirname, '../../../tmp/avatar')

    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true })
    }

    this.file = file
    this.filePath = path.join(this.uploadPath, file.filename)
  }

  save(): string {
    const writeStream = fs.createWriteStream(this.filePath)
    this.file.file.pipe(writeStream)

    return this.filePath
  }

  async delete(fileName: string): Promise<void> {
    fs.unlinkSync(fileName)
  }
}
