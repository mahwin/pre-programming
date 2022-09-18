import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

  @ApiProperty({
    example: '1231',
    description: 'user id',
    required: true,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    example: 'Anoymous',
    description: 'user nickname',
    required: false,
  })
  @IsOptional()
  public name: string;

  @ApiProperty({
    example: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
    description: 'avatar URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  public avatar: string;

  @ApiProperty({
    example: '2022-09-17T03:23:23.825Z',
    description: '생성 일',
    required: true,
  })
  @IsDate()
  public createdAt: Date;

  @ApiProperty({
    example: '2022-09-18T03:23:23.825Z',
    description: '수정 일',
    required: true,
  })
  @IsOptional()
  @IsDate()
  public updatedAt: Date;
}
