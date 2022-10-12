import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { ConfirmUserDto } from './dto/confirm-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getUser(req) {
    return this.parsePayload(req);
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
  async update(req, updateUser) {
    const userData = this.parsePayload(req);
    console.log(updateUser);
    const newData = await this.prisma.user.update({
      where: {
        id: (await userData).id,
      },
      data: { ...updateUser },
    });
    return { ok: true };
  }

  async parsePayload(req): Promise<UserDto> {
    const signedJwtAccessToken = req.headers.authorization.split(' ')[1];
    const { userId }: any = this.jwtService.decode(signedJwtAccessToken);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }
}
