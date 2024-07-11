import { BaseModel } from '@/common/models/BaseModel.model';

export interface AnswerProps {
  question: any;

  assessment: any;

  answerText: string | null;

  answerValue: number | null;
}

export class AnswerModel extends BaseModel implements AnswerProps {
  id: number;

  question: any;

  assessment: any;

  answerText: string | null;

  answerValue: number | null;

  constructor(props?: AnswerProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
