import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:"標題不能是空的"})
    title:string
}
