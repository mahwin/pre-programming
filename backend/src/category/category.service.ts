import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const res = await this.prisma.category.findMany();
    return res;
  }
}
