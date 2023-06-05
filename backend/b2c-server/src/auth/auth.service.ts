import { Injectable, NotFoundException, Header } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import * as twilio from 'twilio';
import { JwtService } from '@nestjs/jwt';
import generateName from '../utils/generateName';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn({ phone }: LoginDto) {
    // 개발모드거나 공용 아이디면 twillio 사용하지 않고 통과 토큰 전송
    if (process.env.NODE_ENV === 'development' || phone === '01012341234') {
      return {
        ok: true,
      };
    }

    const twilioClient = twilio(
      this.configService.get('TWILIO_SID'),
      this.configService.get('TWILIO_TOKEN'),
    );

    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    // 토큰이랑 user id를 연결 시킬껀데
    // 만약 가입한 적이 있으면 그 id와 token을 같이 저장하고 아니라면
    // 유저를 생성하고 생성된 유저의 id와 token을 같이 저장한다.
    const token = await this.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              phone,
            },
            create: {
              name: generateName(),
              avatar: '1',
              phone,
            },
          },
        },
      },
    });

    const message = await twilioClient.messages.create({
      messagingServiceSid: this.configService.get('TWILIO_MSID'),
      to: `82${phone.slice(1)}`,
      body: `Wellcome! we are pre-programmers.               Your login token is ${payload}.`,
    });
    return {
      ok: true,
    };
  }

  async confirm({ token }) {
    // 000000 토큰은 검증안 하고 공용 아이디로 로그인 허락
    if (token == '000000')
      return { ok: true, accessToken: this.jwtService.sign({ userId: 1 }) };

    const foundToken = await this.prisma.token.findUnique({
      where: {
        payload: token,
      },
    });

    if (foundToken) {
      await this.prisma.token.deleteMany({
        where: {
          userId: foundToken.userId,
        },
      });
      const payload = {
        userId: foundToken.userId,
      };
      return { ok: true, accessToken: this.jwtService.sign(payload) };
    } else {
      return { ok: false, message: `인증 번호가 일치하지 않습니다.` };
    }
  }

  @Header('authorization', '')
  async signOut() {
    return { ok: true, message: '로그아웃 성공' };
  }
}
