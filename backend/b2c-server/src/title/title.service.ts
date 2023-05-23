import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TitleService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.title.findUnique({
      where: {
        id: 1,
      },
    });
    return { ok: true, [data.category]: eval(data.data) };
  }
}
