import { PartialType, PickType } from '@nestjs/mapped-types'
import { LoginDto } from './login-auth.dto'
import { IsNotExists } from '@/common/rules/is-not-exists.rule'
import { IsNotEmpty } from 'class-validator'
import { IsConfirmedRule } from '@/common/rules/is-confirmed.rule'

export class RegisterDto extends PickType(LoginDto, []) {
  @IsNotEmpty({ message: '用戶名稱不能是空的' })
  @IsNotExists('user', { message: '用戶已經注冊' })
  name: string
  @IsNotEmpty({ message: '密碼不能是空的' })
  @IsConfirmedRule({ message: '二次確認密碼不一致' })
  password: string
  @IsNotEmpty({ message: '二次確認密碼不能是空' })
  password_confirmation: string
  @IsNotEmpty({ message: '郵箱不能是空' })
  email: string
}
