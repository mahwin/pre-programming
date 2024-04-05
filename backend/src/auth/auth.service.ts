import { Injectable, Header } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, TokenDto } from './dto/auth.dto';
import coolsms from 'coolsms-node-sdk';
import { JwtService } from '@nestjs/jwt';
import { getRandomNumber, createName } from 'src/utils';
import { JwtPayload } from './type';

function isSMSPass(phone = '') {
  return process.env.NODE_ENV === 'development' || phone === '01012341234';
}
function isTokenValidPass(token = '') {
  return token === '000000';
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signIn({ phone }: LoginDto) {
    // 개발모드거나 공용 아이디면 twillio 사용하지 않고 통과
    if (isSMSPass(phone)) return { ok: true };

    const coolsmsClient = new coolsms(
      process.env.COOLSMS_API_KEY,
      process.env.COOLSMS_API_SECRET,
    );

    const payload = getRandomNumber(6);

    const token = await this.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              phone,
            },
            create: {
              name: createName(),
              avatar: '1',
              phone,
            },
          },
        },
      },
    });

    await coolsmsClient.sendOne({
      to: phone,
      from: '01027597085',
      autoTypeDetect: true,
      text: `환영합니다. \n인증번호는 ${payload} 입니다.`,
    });

    return token.userId;
  }

  async confirmToken({ token }: TokenDto, userId: number) {
    // 000000 토큰은 검증안 하고 공용 아이디로 로그인 허락
    if (isTokenValidPass(token))
      return {
        ok: true,
        accessToken: this.jwtService.sign(
          { userId: 1 },
          { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
        ),
        refreshToken: this.jwtService.sign(
          { userId: 1 },
          { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME },
        ),
      };

    const foundToken = await this.prisma.token.findUnique({
      where: {
        payload: token,
        userId,
      },
    });

    if (foundToken) {
      await this.prisma.token.deleteMany({
        where: {
          userId,
        },
      });

      const payload = { userId };
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      });
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      });

      return { ok: true, refreshToken, accessToken };
    } else {
      return { ok: false, message: `인증 번호가 일치하지 않습니다.` };
    }
  }

  @Header('authorization', '')
  async signOut() {
    return { ok: true, message: '로그아웃 성공' };
  }

  async validateUser({ userId }: JwtPayload) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getAccessTokenByRefreshToken({ userId }: JwtPayload) {
    try {
      const newAccessToken = this.jwtService.sign(
        { userId },
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
      );
      return newAccessToken;
    } catch (e) {
      console.error(e);
      return Error(e);
    }
  }
}
