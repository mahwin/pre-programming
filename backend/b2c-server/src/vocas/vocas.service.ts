import { Injectable } from '@nestjs/common';
import { VocaDto } from './dto/vocas-voca.dto';
import { PrismaService } from 'prisma/prisma.service';
import dataSplitter from '../utils/dataSplitter';
import uniqueArr from 'src/utils/uniqueArr';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VocasService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  private voca: VocaDto[] = [];

  async getAll(voca) {
    const data = await this.prisma.vocabulary.findMany({
      where: { category: voca },
    });
    let splittedData = dataSplitter(data);
    return { ok: true, data: splittedData };
  }

  async levelUpdate(category: string, { userId, level }) {
    const isExisted = await this.prisma.userAddVocabulary.findUnique({
      where: { userId },
    });
    if (isExisted) {
      const oldLevel = isExisted[category];
      const data = await this.prisma.userAddVocabulary.update({
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
  async getMyVoca(userId) {
    const levels = await this.prisma.userAddVocabulary.findUnique({
      where: {
        ...userId,
      },
    });
    return { ok: true, data: levels };
  }
}
