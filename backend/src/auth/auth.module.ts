import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';
import { UserService } from 'src/user/user.service';
import { JwtRefreshStrategy } from './strategy/refreshToken';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, JwtRefreshStrategy],
})
export class AuthModule {}
