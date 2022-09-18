import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';

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

  @ApiOperation({
    summary: '유저 정보 업데이트',
    description: '유저가 개인 정보를 수정',
  })
  @ApiCreatedResponse({
    description:
      'JWT 토큰 유효성 검사 후 유저가 보낸 정보를 토대로 user db 업데이트',
    type: UserDto,
  })
  @Post('update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Req() req: Request, @Body() updateUser: UpdateUSerDto) {
    return this.userService.update(req, updateUser);
  }
}
