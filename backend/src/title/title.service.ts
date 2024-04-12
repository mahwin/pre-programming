import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TitleService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const { category, data } = await this.prisma.title.findUnique({
      where: {
        id: 1,
      },
    });
    return { [category]: JSON.parse(data) };
  }
}
