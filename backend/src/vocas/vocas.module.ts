import { Module } from '@nestjs/common';
import { VocasController } from './vocas.controller';
import { VocasService } from './vocas.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    AuthModule,
  ],
  controllers: [VocasController],
  providers: [VocasService, JwtStrategy],
})
export class VocasModule {}
