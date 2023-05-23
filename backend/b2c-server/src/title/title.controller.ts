import { Controller, Get } from '@nestjs/common';
import { TitleService } from './title.service';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Get('/all')
  getAllTitles() {
    return this.titleService.getAll();
  }
}
