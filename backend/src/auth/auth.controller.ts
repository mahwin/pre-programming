import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { toInteger } from 'src/utils';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { JwtPayload } from './type';
@Controller('auth')
@ApiTags('auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '로그인 시도',
    description: '유저가 로그인을 위해 폰번호 입력',
  })
  @ApiCreatedResponse({
    description: '넘어온 번호로 6자리 랜덤 수 입력 휴대폰 번호로 제공',
  })
  async signIn(@Res() res: Response, @Body() phone: LoginDto) {
    const { userId } = await this.authService.signIn(phone);

    res
      .cookie('userId', userId, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(201)
      .send({ ok: true });
  }

  @Post('confirm')
  @ApiOperation({
    summary: '인증번호 확인',
    description: '유저에게 보낸 인증번호와 유저가 입력한 번호를 비교',
  })
  @ApiCreatedResponse({
    description: '인증번호가 일치한다면 JWT값을 반환합니다.',
    type: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMGIydGxiaUk2SWpFNU1UUXpNaUlzSW5OMVlpSTZJakFpTENKa1lYUmhJam9pZFhObGNpSXNJbWxoZENJNk1UWTJNelF4TmpFNU9Td2laWGh3SWpveE5qazBPVGN6TnprNWZRLl9ZUENYYkFoeVpjbUsyUlhsQWE1MUdaMGM5aXMzT21OcXI5VUQyenI5NzgiLCJpYXQiOjE2NjM0MTYxOTksImV4cCI6MTY5NDk3Mzc5OX0.BXjHx6cjvl7V8BY5zlfXkvyzhaIDkDo2ym0uLgIHxl0',
  })
  async confirmToken(
    @Req() req: Request,
    @Body() token: TokenDto,
    @Res() res: Response,
  ) {
    const userId = toInteger(req.cookies.userId);
    const { ok, refreshToken, accessToken } =
      await this.authService.confirmToken(token, userId);

    if (!ok) return res.status(401).send({ ok: false });

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .send({ ok: true, accessToken });
  }

  @Get('signout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃',
  })
  @ApiCreatedResponse({
    description: 'headers에서 JWT를 삭제함',
    type: null,
  })
  async signOut(@Req() req: Request, @Res() res: Response) {
    const userId = toInteger(req.cookies.userId);

    res.clearCookie('userId');
    res.clearCookie('refreshToken');
    if (userId === -1) return res.status(200).send({ ok: true });

    await this.authService.signOut(userId);

    return res.status(200).send({ ok: true });
  }

  @Get('refresh')
  @ApiOperation({
    summary: '토큰 재발급',
    description: 'refreshToken을 이용해 accessToken 재발급',
  })
  @ApiCreatedResponse({
    description: '새로운 accessToken을 반환',
  })
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const payload = req.user as JwtPayload;
    const currentRefreshToken = req.cookies.refreshToken;
    const result = await this.authService.refresh(payload, currentRefreshToken);
    if (result.ok) {
      res
        .cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(201)
        .send({ accessToken: result.accessToken });
      return;
    }
    res.status(401).send('refresh token is not valid');
  }
}
