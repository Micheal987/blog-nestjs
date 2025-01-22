import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { validates } from './common/validdate'
import { TransformInterceptor } from './plugin/Interceptor/transform-Interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new validates())
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  await app.listen(3000)
}
bootstrap()
