import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VocasService } from './vocas.service';
import { LevelUpdateDto } from './dto/vocas-level-update.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/type';

@Controller('vocabulary')
export class VocasController {
  constructor(private readonly vocasService: VocasService) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  getUserVoca(@Req() req: Request) {
    const payload = req.user as JwtPayload;
    return this.vocasService.getUserVoca(payload);
  }

  @Get('/all')
  getAllVoca() {
    return this.vocasService.getAll();
  }

  @Get('/classified')
  getClassifiedVoca() {
    return this.vocasService.getClassifiedVoca();
  }

  @Post('/:category')
  levelUpdate(
    @Param('category') category: string,
    @Body() updateData: LevelUpdateDto,
  ) {
    return this.vocasService.levelUpdate(category, updateData);
  }
}
