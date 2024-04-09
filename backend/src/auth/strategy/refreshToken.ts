import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../type';

function getRefreshToken(request: Request) {
  try {
    const cookies = request.headers.cookie.split('; ');
    const refreshToken = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );
    return refreshToken ? refreshToken.split('=')[1] : null;
  } catch (e) {
    return null;
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => getRefreshToken(req),
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_KEY,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
