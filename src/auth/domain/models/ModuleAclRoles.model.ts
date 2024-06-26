import { BaseModel } from '@/auth/domain/models/BaseModel.model';
import { ModuleAclModel } from '@/auth/domain/models/ModuleAcl.model';
import { Role } from '@/database/entities/Role.entity';

export interface ModuleAclRolesProps {
  readonly id: number;
  readonly idModuleAcl: ModuleAclModel; // le quite los corchetes []
  readonly idRole: Role[];
}
export class ModuleAclRolesModel
  extends BaseModel
  implements ModuleAclRolesProps
{
  readonly id: number;
  readonly idModuleAcl: ModuleAclModel;
  readonly idRole: Role[];

  constructor(props?: ModuleAclRolesProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
