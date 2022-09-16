import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async confirm(phone: AuthDto) {
    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    const token = await this.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...phone,
            },
            create: {
              name: 'Anonymous',
              ...phone,
            },
          },
        },
      },
    });
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: '821085133964',
    //   body: `Your login token is ${payload}.`,
    // });
  }
  async signOut() {}
}
