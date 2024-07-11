import { BaseModel } from '@/common/models/BaseModel.model';

export interface AssessmentProps {
  title: string;

  description: string;
}

export class AssessmentModel extends BaseModel implements AssessmentProps {
  id: number;

  title: string;

  description: string;

  constructor(props?: AssessmentProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
