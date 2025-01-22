import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ArticleService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  //
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    })
  }
  //
  async findAll(page = 10) {
    const row = this.config.get('ARICLE_PAGE_ROW')
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: +row,
    })
    const total = await this.prisma.article.count()
    return {
      meate: {
        currten_page: page,
        page_row: row,
        total,
        total_page: Math.ceil(total / row),
      },
      data: articles,
    }
  }
  //
  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
    })
  }
  //
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id: +id },
      data: { ...updateArticleDto, categoryId: +updateArticleDto.categoryId },
    })
  }

  //
  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    })
  }
}
