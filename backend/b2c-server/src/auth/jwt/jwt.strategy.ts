import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 헤더 Authentication 에서 Bearer 토큰으로부터 jwt를 추출하겠다는 의미
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
      ignoreExpiration: false, // jwt 만료를 무시할 것인지 (기본값: false)
    });
  }

  async validate(payload: Payload) {
    const user = payload.sub === '0';
    if (user) {
      return user; // request.user에 해당 내용을 넣어준다 (Passport 라이브러리가 해줌)
    } else {
      throw new UnauthorizedException('토큰이 일치하지 않습니다.');
    }
  }
}
