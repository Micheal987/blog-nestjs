import { IsNotEmpty } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty({ message: '標題不能是空的' })
  title: string
  @IsNotEmpty({ message: '内容不能是空的' })
  content: string
  @IsNotEmpty({ message: '選擇欄目id' })
  categoryId: number
}
