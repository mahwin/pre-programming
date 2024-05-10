import { Module } from '@nestjs/common';
import { TitleController } from './category.controller';
import { TitleService } from './category.service';

@Module({
  controllers: [TitleController],
  providers: [TitleService],
})
export class TitleModule {}
