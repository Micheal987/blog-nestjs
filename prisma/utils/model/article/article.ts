import { PrismaClient } from '@prisma/client'
import { create } from '../../helper/helper'
import { Random } from 'mockjs'
import { hash } from 'argon2'

export const articleSeed = () => {
  create(30, async (prisma: PrismaClient) => {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 20),
        content: Random.cword(20, 40),
        categoryId: Random.integer(1, 5),
      },
    })
  })
}
