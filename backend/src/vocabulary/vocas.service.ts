import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VocasService {
  constructor(private prisma: PrismaService) {}

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
}
