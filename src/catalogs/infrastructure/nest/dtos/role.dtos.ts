import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRole {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  readonly level: string;
}

export class Params {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number;
}

export class UpdateRole {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly role: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly level: string;
}
