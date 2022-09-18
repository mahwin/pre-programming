import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('user API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '내정보 조회',
    description: '로그인한 유저가 자기 정보 조회',
  })
  @ApiCreatedResponse({
    description: 'JWT 토큰 유효성 검사 후 db에 저장된 유저 정보 리턴',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    return this.userService.getUser(req);
  }
}
