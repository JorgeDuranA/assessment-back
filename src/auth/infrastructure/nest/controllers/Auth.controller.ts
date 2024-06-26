import { AuthMeModel } from '@/auth/domain/models/AuthMe.model';
import { HeaderModel } from '@/auth/domain/models/Headers.model';
import { LoginResult } from '@/auth/domain/models/LoginResult.model';
import { RefreshJWTResult } from '@/auth/domain/models/RefreshJWTResult.model';
import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import { AuthDto } from '@/auth/infrastructure/nest/dtos/Auth.dto';
import {
  LoginResponse,
  MeResponse,
  unauthorizedResponse,
} from '@/auth/infrastructure/nest/dtos/Responses.dto';
import { RoleGuard } from '@/auth/infrastructure/nest/guards/RoleGuard';
import SymbolsAuth from '@/auth/symbols';
import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@ApiSecurity('x-api-key')
@UseGuards(AuthGuard('api-key'))
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  status: 401,
  type: unauthorizedResponse,
})
export class AuthController {
  constructor(
    @Inject(SymbolsAuth.IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'User login',
    description:
      'Endpoint to authenticate a user and generate an access token.',
  })
  @ApiCreatedResponse({
    description: 'login route',
    status: 201,
    type: LoginResponse,
  })
  @ApiBody({ type: AuthDto })
  async auth(@Body() auth: AuthDto): Promise<LoginResult> {
    return this.authService.loginJWT(auth);
  }

  @Get('/me')
  @ApiBearerAuth('authorization')
  @ApiOperation({
    summary: 'get information of user logged',
    description:
      'Endpoint to get information of user logged as roles, name, email, etc',
  })
  @ApiResponse({
    description: 'user information',
    status: 200,
    type: MeResponse,
  })
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async authMe(@Headers() headers: HeaderModel): Promise<AuthMeModel> {
    return this.authService.authMe(headers);
  }

  @Get('/refresh-jwt')
  @ApiOperation({
    summary: 'return new token to keep the user logged',
    description:
      'This endpoint is used to refresh the token and keep the user logged in front, return information as role name, ',
  })
  @ApiResponse({
    description: 'user information',
    status: 200,
    type: MeResponse,
  })
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async refreshJWT(@Headers() headers: HeaderModel): Promise<RefreshJWTResult> {
    return this.authService.refreshJWT(headers);
  }
}
