import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('cookie'),
      secretOrKey: process.env.JWT_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) throw new UnauthorizedException('토큰이 일치하지 않습니다.');

    return done(null, user);
  }
}
