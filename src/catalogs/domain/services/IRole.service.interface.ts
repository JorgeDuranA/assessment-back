import { CreateRoleDto } from '@/catalogs/application/dtos/createRole';
import { RoleModel } from '@/catalogs/domain/models/Role.model';

export interface IRoleService {
  create(Role: CreateRoleDto): Promise<RoleModel>;
  findById(id: number): Promise<RoleModel>;
  findAll(): Promise<RoleModel[]>;
  updateById(id: number, update: CreateRoleDto): Promise<RoleModel>;
}
