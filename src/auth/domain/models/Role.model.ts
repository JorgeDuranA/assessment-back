import { BaseModel } from '@/auth/domain/models/BaseModel.model';

export interface RoleProps {
  readonly id: number;
  readonly role: string;
  readonly level: string;
  readonly description: string;
  readonly active: true;
}

export class RoleModel extends BaseModel implements RoleProps {
  readonly id: number;
  readonly role: string;
  readonly level: string;
  readonly description: string;
  readonly active: true;

  constructor(props?: RoleProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
