import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
//表字段是否唯一
export function IsExists(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient()
          const res = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          })
          return Boolean(res)
        },
      },
    })
  }
}
