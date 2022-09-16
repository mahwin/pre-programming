import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('confirm')
  signIn(@Body() phone: AuthDto) {
    return this.authService.confirm(phone);
  }

  @Post('signout')
  signOut() {
    return this.authService.signOut();
  }
}
