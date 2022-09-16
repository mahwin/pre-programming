import { IsNotEmpty, IsString, IS_LENGTH } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  public phone: string;
}

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  public token: string;
}
