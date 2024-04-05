import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getTimeStamp } from '../../utils';
import { JwtPayload } from '../type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_KEY,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.exp < getTimeStamp()) {
      throw new UnauthorizedException('jwt expired');
    }
    // return payload.userId;
    return payload;
  }
}
