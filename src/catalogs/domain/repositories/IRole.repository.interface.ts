import { RoleModel, RoleProps } from '@/catalogs/domain/models/Role.model';

export interface IRoleRepository {
  findOneById(id: number): Promise<RoleModel>;
  create(Role: RoleProps): Promise<RoleModel>;
  findAll(): Promise<RoleModel[]>;
  updateById(id: number, update: RoleModel): Promise<RoleModel>;
}
