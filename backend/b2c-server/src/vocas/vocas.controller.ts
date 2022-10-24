import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';

import { VocasService } from './vocas.service';
import { LevelUpdateDto } from './dto/vocas-level-update.dto';

@Controller('vocas')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}

  @Post('/me')
  getMyVoca(@Body() userId: string) {
    return this.vocasService.getMyVoca(userId);
  }

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
