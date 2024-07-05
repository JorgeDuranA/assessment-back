import { BaseModel } from '@/common/models/BaseModel.model';

export interface QuestionProps {
  questionText: string;
  step: number;
  nextStep: number;
}

export class QuestionModel extends BaseModel implements QuestionProps {
  questionText: string;
  step: number;
  nextStep: number;

  constructor(props?: QuestionProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
