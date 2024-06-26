import { RoleModel } from '@/catalogs/domain/models/Role.model';
import { Role } from '@/database/entities/Role.entity';

export class RoleMapper {
  Role: RoleModel;

  constructor(entity: Role) {
    const Role = new RoleModel();
    Role.setProps({
      ...entity,
    });

    this.Role = Role;
  }

  public execute(): RoleModel {
    return this.Role;
  }
}
