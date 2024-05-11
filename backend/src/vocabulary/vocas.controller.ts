import { Controller, Get } from '@nestjs/common';
import { VocasService } from './vocas.service';

@Controller('vocabulary')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}

  @Get('/all')
  getAllVoca() {
    return this.vocasService.getAll();
  }

  @Get('/classified')
  getClassifiedVoca() {
    return this.vocasService.getClassifiedVoca();
  }
}
