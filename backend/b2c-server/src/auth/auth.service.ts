import { Injectable, NotFoundException, Header } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import * as twilio from 'twilio';
import { JwtService } from '@nestjs/jwt';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signIn(phone: LoginDto) {
    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    const token = await this.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...phone,
            },
            create: {
              name: 'Anonymous',
              ...phone,
            },
          },
        },
      },
    });
    // 비용 문제로 주석처리
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: `82${phone.slice(1)}`
    //   body: `Your login token is ${payload}.`,
    // });
    return {
      payload,
    };
  }
  async confirm({ token }) {
    const foundToken = await this.prisma.token.findUnique({
      where: {
        payload: token,
      },
    });

    // await this.prisma.token.deleteMany({
    //   where: {
    //     userId: foundToken.userId,
    //   },
    // });
    if (foundToken) {
      const a = this.jwtService.sign({
        token,
        sub: '0',
      });
    } else {
      throw new NotFoundException(`인증 번호가 일치하지 않습니다.`);
    }
  }

  @Header('authorization', '')
  async signOut() {
    return { ok: true, message: '로그아웃 성공' };
  }
}
