import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: '01012345678',
    description: 'phone number',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsOptional()
  public name: string;
}
