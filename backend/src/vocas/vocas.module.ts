import { Module } from '@nestjs/common';
import { VocasController } from './vocas.controller';
import { VocasService } from './vocas.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    }),
  ],
  controllers: [VocasController],
  providers: [VocasService, JwtStrategy],
})
export class VocasModule {}
