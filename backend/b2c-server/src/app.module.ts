import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VocasController } from './vocas/vocas.controller';
import { VocasService } from './vocas/vocas.service';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [AppController, VocasController],
  providers: [AppService, VocasService],
})
export class AppModule {}
