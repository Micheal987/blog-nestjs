import { PrismaClient } from '@prisma/client'
import { create } from '../../helper/helper'
import { Random } from 'mockjs'
import { hash } from 'argon2'

export const categorySeed = () => {
  create(30, async (prisma: PrismaClient) => {
    await prisma.category.create({
      data: {
        title: Random.ctitle(10, 50),
      },
    })
  })
}
