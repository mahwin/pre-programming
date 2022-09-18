import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { Payload } from '../jwt/jwt.payload';
import { UserDto } from './dto/user.dto';

const jwtStrategy = new JwtStrategy();

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async getUser(req) {
    return this.parsePayload(req);
  }
  async update(req, updateUser) {
    console.log('!!!!');
    const userData = this.parsePayload(req);
    const newData = await this.prisma.user.update({
      where: {
        id: (await userData).id,
      },
      data: { ...updateUser },
    });
    return newData;
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
