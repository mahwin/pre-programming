import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, TokenDto } from './dto/auth.dto';

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

  // @Post('signout')
  // signOut() {
  //   return this.authService.signOut();
  // }
}
