import { BaseModel } from '@/common/models/BaseModel.model';

export interface QuestionProps {
  id: number;

  assessment: any;

  question: string;

  options: string[];

  step: number;
}

export class QuestionModel extends BaseModel implements QuestionProps {
  id: number;

  assessment: any;

  question: string;

  options: string[];

  step: number;

  constructor(props?: QuestionProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
