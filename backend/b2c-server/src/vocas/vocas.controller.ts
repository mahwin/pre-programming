import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VocasService } from './vocas.service';
import { LevelUpdateDto } from './dto/vocas-level-update.dto';

@Controller('vocas')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}
  @Get('/:voca')
  getVoca(@Param('voca') voca: string) {
    return this.vocasService.getAll(voca);
  }
  @Post('/:category')
  levelUpdate(
    @Param('category') category: string,
    @Body() updateData: LevelUpdateDto,
  ) {
    return this.vocasService.levelUpdate(category, updateData);
  }
}
