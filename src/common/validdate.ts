import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

//自定義validates規則
export class validates extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const messages = {}
    validationErrors.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0]
    })
    throw new HttpException(
      {
        code: 422,
        messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
    console.log(validationErrors)
    return []
  }
}
