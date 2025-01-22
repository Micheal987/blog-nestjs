import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    })
  }

  async findAll(page = 1) {
    const row = this.config.get('ARICLE_PAGE_ROW')
    const categorys = await this.prisma.category.findMany({
      skip: (page - 1) * row,
      take: +row,
    })
    const total = await this.prisma.category.count()
    return {
      meate: {
        currten_page: page,
        page_row: row,
        total,
        total_page: Math.ceil(total / row),
      },
      data: categorys,
    }
  }

  async findOne(id: number) {
    return await this.prisma.category.findFirst({
      where: { id },
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    })
  }
}
