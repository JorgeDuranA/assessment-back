import { BaseModel } from '@/common/models/BaseModel.model';

export interface AclProps {
  readonly id: number;
  readonly nameAction: string;
  readonly description: string;
}

export class AclModel extends BaseModel implements AclProps {
  readonly id: number;
  readonly nameAction: string;
  readonly description: string;

  constructor(props?: AclProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
