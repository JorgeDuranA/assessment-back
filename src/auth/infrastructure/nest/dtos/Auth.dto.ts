import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'user@domain.com',
    description: 'email user admin',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
