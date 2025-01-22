import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

//上传类型验证
export const filterFilter = (type: string) => {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.includes(type)) {
      callback(new UnsupportedMediaTypeException('文件类型错误'), false)
    } else {
      callback(null, true)
    }
  }
}

//文件上传
export const Upload = (field = 'file', options: MulterOptions) => {
  return applyDecorators(UseInterceptors(FileInterceptor(field, options)))
}

//图片上传
export const Image = (field = 'file') => {
  return Upload(field, {
    //上传文件大小限制
    limits: { fieldSize: Math.pow(1024, 2) * 2 },
    fileFilter: filterFilter('image'),
  } as MulterOptions)
}

//文档上传
export const Document = (field = 'file') => {
  return Upload(field, {
    //上传文件大小限制
    limits: { fieldSize: Math.pow(1024, 2) * 2 },
    fileFilter: filterFilter('document'),
  } as MulterOptions)
}
//表格
export const Exles = (field = 'file') => {
  return Upload(field, {
    //上传文件大小限制
    limits: { fieldSize: Math.pow(1024, 2) * 2 },
    fileFilter: filterFilter('Exles'),
  } as MulterOptions)
}

//附件zip
export const Zip = (field = 'file') => {
  return Upload(field, {
    //上传文件大小限制
    limits: { fieldSize: Math.pow(1024, 2) * 6 },
    fileFilter: filterFilter('zip'),
  } as MulterOptions)
}
