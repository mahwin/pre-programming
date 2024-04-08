import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfirmUserDto } from './dto/confirm-user.dto';
import { UpdateUSerDto } from './dto/update-user.dto';
import { JwtPayload } from '../auth/type';

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
}
