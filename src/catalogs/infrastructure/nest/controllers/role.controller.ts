import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { unauthorizedResponse } from '@/auth/infrastructure/nest/dtos/Responses.dto';
import { RoleGuard } from '@/auth/infrastructure/nest/guards/RoleGuard';
import { IRoleService } from '@/catalogs/domain/services/IRole.service.interface';
import { Role } from '@/catalogs/infrastructure/nest/dtos/response';
import {
  CreateRole,
  Params,
  UpdateRole,
} from '@/catalogs/infrastructure/nest/dtos/role.dtos';
import SymbolsCatalogs from '@/catalogs/symbols';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Role')
@Controller('catalogs/role')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@UseGuards(AuthGuard('api-key'))
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  status: 401,
  type: unauthorizedResponse,
})
export class RoleController {
  constructor(
    @Inject(SymbolsCatalogs.IRoleService)
    private readonly RoleService: IRoleService,
  ) {}

  @ApiOperation({
    summary: 'Find all roles in database',
    description: 'Endpoint to get all roles saved in database',
  })
  @ApiResponse({
    isArray: true,
    type: Role,
    status: 200,
  })
  @Get('/all')
  async findAllRoles() {
    return await this.RoleService.findAll();
  }

  @ApiOperation({
    summary: 'Find role in database by id',
    description: 'Endpoint to get roles saved in database by id',
  })
  @ApiResponse({
    type: Role,
    status: 200,
  })
  @Get('/:id')
  async findRoleById(@Param() params: Params) {
    return await this.RoleService.findById(params.id);
  }

  @ApiOperation({
    summary: 'Add role in database',
    description: 'Endpoint to add roles in database',
  })
  @ApiResponse({
    type: Role,
    status: 200,
  })
  @Post('/add')
  async createRole(@Body() body: CreateRole) {
    return await this.RoleService.create(body);
  }

  @ApiOperation({
    summary: 'Update role in database by id',
    description: 'Endpoint to update roles saved in database by id',
  })
  @ApiResponse({
    type: Role,
    status: 200,
  })
  @Put('/:id')
  async updateRole(@Param() params: Params, @Body() body: UpdateRole) {
    return this.RoleService.updateById(params.id, body);
  }
}
