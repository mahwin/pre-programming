import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import camelCaser from 'src/utils/camelCaser';
import uniqueArr from 'src/utils/uniqueArr';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/type';

@Injectable()
export class VocasService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getAll() {
    const { data } = await this.prisma.compressedVocabulary.findUnique({
      where: {
        id: 1,
      },
    });

    return { ok: true, data };
  }

  async getClassifiedVoca() {
    const { data } = await this.prisma.classifiedVocabulary.findUnique({
      where: {
        id: 1,
      },
    });

    return { ok: true, data };
  }

  async levelUpdate(category: string, { userId, level }) {
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
