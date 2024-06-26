import { Inject, Injectable } from '@nestjs/common';

import { CreateRoleDto } from '@/catalogs/application/dtos/createRole';
import { RoleModel } from '@/catalogs/domain/models/Role.model';
import { IRoleRepository } from '@/catalogs/domain/repositories/IRole.repository.interface';
import { IRoleService } from '@/catalogs/domain/services/IRole.service.interface';
import SymbolsCatalogs from '@/catalogs/symbols';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject(SymbolsCatalogs.IRoleRepository)
    private RoleRepository: IRoleRepository,
  ) {}
  async create(Role: CreateRoleDto): Promise<RoleModel> {
    const newRole = await this.RoleRepository.create(Role);
    return newRole;
  }
  async findById(id: number): Promise<RoleModel> {
    const Role = await this.RoleRepository.findOneById(id);
    return Role;
  }
  async findAll(): Promise<RoleModel[]> {
    const Roles = await this.RoleRepository.findAll();
    return Roles;
  }
  async updateById(id: number, update: CreateRoleDto): Promise<RoleModel> {
    let Role = new RoleModel(update);
    Role = await this.RoleRepository.updateById(id, Role);
    return Role;
  }
}
