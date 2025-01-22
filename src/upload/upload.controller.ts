import { Controller, Post, UploadedFile } from '@nestjs/common'
import { Document, Exles, Image, Zip } from './upload'

@Controller('upload')
export class UploadController {
  @Post('image')
  @Image()
  images(@UploadedFile() file: Express.Multer.File) {
    return file
  }
  @Post('document')
  @Document()
  document(@UploadedFile() file: Express.Multer.File) {
    return file
  }
  @Post('Ex')
  @Exles()
  exles(@UploadedFile() file: Express.Multer.File) {
    return file
  }
  @Post('zip')
  @Zip()
  zip(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}
