import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, TokenDto } from './dto/auth.dto';
import coolsms from 'coolsms-node-sdk';
import { JwtService } from '@nestjs/jwt';
import { getRandomNumber, createName } from 'src/utils';
import { JwtPayload } from './type';
import { getTimeStamp } from 'src/utils';

type Refresh =
  | {
      ok: true;
      refreshToken: string;
      accessToken: string;
    }
  | { ok: false };

function isSMSPass(phone = '') {
  return process.env.NODE_ENV === 'development' || phone === '01012341234';
}
function isTokenValidPass(token = '') {
  return token === '000000';
}

const publicPayload = { userId: 1 };

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn({ phone }: LoginDto) {
    if (isSMSPass(phone)) return publicPayload;

    const coolsmsClient = new coolsms(
      process.env.COOLSMS_API_KEY,
      process.env.COOLSMS_API_SECRET,
    );

    const randomNumbers = getRandomNumber(6);

    const payload = await this.prisma.token.create({
      data: {
        payload: randomNumbers,
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
      text: `환영합니다. \n인증번호는 ${randomNumbers} 입니다.`,
    });

    return payload;
  }

  async confirmToken({ token }: TokenDto, userId: number) {
    // 000000 토큰은 검증안 하고 공용 아이디로 로그인 허락
    const accessToken = await this.createAccessToken(publicPayload);
    const refreshToken = await this.createRefreshToken(publicPayload);

    if (isTokenValidPass(token)) {
      this.updateRefreshTokenTable(publicPayload.userId, refreshToken);
      return {
        accessToken,
        refreshToken,
        ok: true,
      };
    }

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

      const refreshToken = await this.createRefreshToken(payload);
      const accessToken = await this.createAccessToken(payload);

      await this.updateRefreshTokenTable(userId, refreshToken);

      return { ok: true, refreshToken, accessToken };
    } else {
      return { ok: false, message: `인증 번호가 일치하지 않습니다.` };
    }
  }

  async validateUser({ userId }: JwtPayload) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async signOut(userId: number) {
    this.updateRefreshTokenTable(userId, '');
  }

  async refresh(
    payload: JwtPayload,
    currentRefreshToken: string,
  ): Promise<Refresh> {
    const oldRefreshToken = await this.prisma.refreshToken.findUnique({
      where: { userId: payload.userId },
    });

    if (oldRefreshToken.token === currentRefreshToken) {
      const newRefreshToken = await this.createRefreshToken(payload);
      await this.updateRefreshTokenTable(payload.userId, newRefreshToken);
      return {
        ok: true,
        refreshToken: newRefreshToken,
        accessToken: await this.createAccessToken(payload),
      };
    }

    return { ok: false };
  }

  async createAccessToken(payload: { userId: number }) {
    return this.jwtService.sign({
      ...payload,
      exp:
        getTimeStamp() + Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
    });
  }
  async createRefreshToken(payload: { userId: number }) {
    return this.jwtService.sign({
      ...payload,
      exp:
        getTimeStamp() + Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    });
  }

  async updateRefreshTokenTable(userId: number, token: string) {
    try {
      const isExisted = await this.prisma.refreshToken.findUnique({
        where: { userId },
      });
      if (isExisted) {
        await this.prisma.refreshToken.update({
          where: { userId },
          data: { token },
        });
        return;
      }

      await this.prisma.refreshToken.create({
        data: {
          token,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (e) {
      throw Error(e);
    }
  }
}
