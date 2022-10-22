import { Controller, Get, Param, Post } from '@nestjs/common';
import { VocasService } from './vocas.service';

@Controller('vocas')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}
  @Get('/:voca')
  getVoca(@Param('voca') voca: string) {
    return this.vocasService.getAll(voca);
  }
}
