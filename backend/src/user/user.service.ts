import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfirmUserDto } from './dto/confirm-user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';
import { JwtPayload } from '../auth/type';
import { camelCaser, uniqueArr } from '../utils/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async getUser({ userId }: JwtPayload) {
    const userData = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return { ok: true, data: userData };
  }

  async confirm(confirmData: ConfirmUserDto) {
    const alreadyExists = Boolean(
      await this.prisma.user.findUnique({
        where: { ...confirmData },
      }),
    );
    if (alreadyExists) return { ok: false, message: '중복' };
    return {
      ok: true,
      data: { ...confirmData },
    };
  }
  async update({ userId }: JwtPayload, updateUser: UpdateUSerDto) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...updateUser },
    });
    console.log('updateUser', updateUser);
    return { ok: true };
  }

  async getUserVocabulary({ userId }: JwtPayload) {
    const userVocas = await this.prisma.userAddVocabulary.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return { ok: true, data: userVocas };
  }

  async userVocabularyUpdate(category: string, { userId, level }) {
    const isExisted = await this.prisma.userAddVocabulary.findUnique({
      where: { userId },
    });
    if (isExisted) {
      category = camelCaser(category);
      const oldLevel = isExisted[category] || '[]';
      await this.prisma.userAddVocabulary.update({
        where: {
          userId,
        },
        data: {
          [category]: uniqueArr(oldLevel, level),
        },
      });
      return { ok: true, message: '업데이트 성공' };
    } else {
      await this.prisma.userAddVocabulary.create({
        data: {
          [category]: level,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return { ok: true, message: '저장 성공' };
  }
  async getUserVoca({ userId }: JwtPayload) {
    const userVocas = await this.prisma.userAddVocabulary.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return { ok: true, data: userVocas };
  }
}
