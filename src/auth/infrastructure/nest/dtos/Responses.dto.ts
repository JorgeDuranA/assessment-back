import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({
    example: '400',
    description: 'codigo de error',
  })
  readonly statusCode: number;
  @ApiProperty({
    example: 'to should not be empty',
    description: 'Description of the error',
  })
  readonly message: string;
  @ApiProperty({
    example: 'Bad Request',
  })
  readonly error: string;
}

export class unauthorizedResponse {
  @ApiProperty({
    example: '401',
    description: 'codigo de error',
  })
  statusCode: number;
  @ApiProperty({
    example: 'Unauthorized',
    description: '',
  })
  message: string;
}

export class LoginResponse {
  @ApiProperty({
    description: 'response status',
  })
  success: boolean;
  @ApiProperty({
    description: 'message sent from the server',
  })
  message: string;

  @ApiProperty({
    description: 'token generated to log the user',
  })
  token: string;
}

class RoleClass {
  @ApiProperty()
  id: number;
  @ApiProperty()
  role: string;
  @ApiProperty()
  level: string;
  @ApiProperty()
  description: string;
}

export class MeResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({
    isArray: true,
    type: RoleClass,
  })
  roles: RoleClass[];
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  secondSurname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  areaCode: string;
}

export class RefreshJWT {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  id: number;
  @ApiProperty({
    isArray: true,
    type: RoleClass,
  })
  roles: RoleClass[];
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  secondSurname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  areaCode: string;
}
