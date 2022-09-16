import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() phone: LoginDto) {
    return this.authService.signIn(phone);
  }

  @Post('confirm')
  confirm(@Body() token: TokenDto) {
    return this.authService.confirm(token);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  check() {
    return { ok: true };
  }

  // @Post('signout')
  // signOut() {
  //   return this.authService.signOut();
  // }
}
