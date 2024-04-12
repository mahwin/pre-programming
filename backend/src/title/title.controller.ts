import { Controller, Get, Res } from '@nestjs/common';
import { TitleService } from './title.service';
import { Response } from 'express';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Get('/all')
  async getAllTitles(@Res() res: Response) {
    const titles = await this.titleService.getAll();
    res.status(200).json(titles);
  }
}
