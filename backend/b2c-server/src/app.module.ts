import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VocabularyController } from './vocabulary/vocabulary.controller';
import { VocabularyService } from './vocabulary/vocabulary.service';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, VocabularyModule],
  controllers: [VocabularyController],
  providers: [VocabularyService],
})
export class AppModule {}
