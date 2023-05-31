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
    // 개발모드면 twillio 사용하지 않고 토큰만 발행
    if (process.env.NODE_ENV === 'development')
      ({
        ok: true,
        payload: '529880',
      });

    const twilioClient = twilio(
      this.configService.get('TWILIO_SID'),
      this.configService.get('TWILIO_TOKEN'),
    );

    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    //토큰이랑 user id를 연결 시킬껀데
    //만약 가입한 적이 있으면 그 id와 token을 같이 저장하고 아니라면
    //유저를 생성하고 생성된 유저의 id와 token을 같이 저장한다.
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
      body: `Your login token is ${payload}.`,
    });
    return {
      ok: true,
      payload,
    };
  }

  async confirm({ token }) {
    const foundToken = await this.prisma.token.findUnique({
      where: {
        payload: token,
      },
    });
    await this.prisma.token.deleteMany({
      where: {
        userId: foundToken.userId,
      },
    });
    if (foundToken) {
      const payload = {
        userId: foundToken.userId,
      };
      return { ok: true, accessToken: this.jwtService.sign(payload) };
    } else {
      throw new NotFoundException(`인증 번호가 일치하지 않습니다.`);
    }
  }

  @Header('authorization', '')
  async signOut() {
    return { ok: true, message: '로그아웃 성공' };
  }
}
