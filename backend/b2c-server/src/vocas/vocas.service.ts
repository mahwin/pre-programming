import { Injectable } from '@nestjs/common';
import { VocaDto } from './dto/vocas-voca.dto';
import { PrismaService } from 'prisma/prisma.service';
import dataSplitter from '../utils/dataSplitter';

@Injectable()
export class VocasService {
  constructor(private prisma: PrismaService) {}
  private voca: VocaDto[] = [];

  async getAll(voca) {
    console.log(voca);
    const data = await this.prisma.vocabulary.findMany({
      where: { category: voca },
    });

    let splittedData = dataSplitter(data);
    console.log(splittedData);
    return { ok: true, data: splittedData };
  }
}
