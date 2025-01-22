import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaController } from './prisma/prisma.controller'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    CategoryModule,
    ArticleModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
  ],
  controllers: [AppController, PrismaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
