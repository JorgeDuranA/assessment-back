import { RoleModel } from '@/auth/domain/models/Role.model';
import { ApiProperty } from '@nestjs/swagger';

export class Role extends RoleModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  level: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  active: true;
}
