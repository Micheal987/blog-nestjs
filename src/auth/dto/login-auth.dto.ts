import { IsEmail, IsNotEmpty } from 'class-validator'
import { IsExists } from '@/common/rules/is-exists.rule'

export class LoginDto {
  @IsNotEmpty({ message: '名稱不能是空的' })
  @IsExists('user', { message: '用戶未注冊' })
  name: string
  @IsNotEmpty({ message: '密碼不能是空的' })
  password: string
}
