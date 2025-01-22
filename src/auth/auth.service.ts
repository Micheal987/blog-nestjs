import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { LoginDto } from './dto/login-auth.dto'
import { RegisterDto } from './dto/register-auth.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, verify } from 'argon2'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth'
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { name: dto.name },
    })
    const psMatch = await verify(user.password, dto.password)
    if (!psMatch) throw new ForbiddenException('密码输入错误')
    return this.token(user)
  }
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
        email: dto.email,
      },
    })
    return this.token(user)
  }
  async token(user: user) {
    return {
      token: await this.jwt.signAsync({
        username: user.name,
        sub: user.id,
      }),
    }
  }
}
