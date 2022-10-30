import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VocasModule } from './vocas/vocas.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, VocasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
