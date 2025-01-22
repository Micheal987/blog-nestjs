import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

//表字段是否唯一
export function IsConfirmedRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return value == args.object[`${args.property}_confirmation`]
        },
      },
    })
  }
}
