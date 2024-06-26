import { BaseModel } from '@/auth/domain/models/BaseModel.model';
import { AclModel } from '@/catalogs/domain/models/Acl.model';
import { ModuleModel } from '@/catalogs/domain/models/Modules.model';

export interface AclProps {
  readonly id: number;
  readonly idCAcl: AclModel;
  readonly idCModule: ModuleModel;
}
export class ModuleAclModel extends BaseModel implements AclProps {
  readonly id: number;
  readonly idCAcl: AclModel;
  readonly idCModule: ModuleModel;

  constructor(props?: AclProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
