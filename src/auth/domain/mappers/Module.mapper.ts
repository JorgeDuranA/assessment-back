import { ModuleAclRolesModel } from '@/auth/domain/models/ModuleAclRoles.model';
import { ModuleAclRoles as ModuleAclRolesEntity } from '@/database/entities/ModuleAclRoles.entity';

export class ModuleAclRolesMapper {
  module: ModuleAclRolesModel;

  constructor(entity: ModuleAclRolesEntity) {
    const module = new ModuleAclRolesModel();
    module.setProps({
      ...entity,
    });

    this.module = module;
  }

  public execute(): ModuleAclRolesModel {
    return this.module;
  }
}
