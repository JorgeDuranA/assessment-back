import { BaseModel } from '@/common/models/BaseModel.model';

export interface RoleProps {
  readonly role: string;
  readonly level: string;
  readonly description: string;
}

export class RoleModel extends BaseModel implements RoleProps {
  readonly role: string;
  readonly level: string;
  readonly description: string;

  constructor(props?: RoleProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
