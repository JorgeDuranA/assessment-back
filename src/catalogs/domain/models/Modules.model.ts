import { BaseModel } from '@/common/models/BaseModel.model';

export interface ModuleProps {
  readonly id: number;
  readonly nameModule: string;
}

export class ModuleModel extends BaseModel implements ModuleProps {
  readonly id: number;
  readonly nameModule: string;

  constructor(props?: ModuleProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
