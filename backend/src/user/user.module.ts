import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME },
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
