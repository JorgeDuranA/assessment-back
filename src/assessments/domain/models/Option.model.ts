import { BaseModel } from '@/common/models/BaseModel.model';

export interface OptionProps {
  id: number;

  question: any;

  optionText: string;

  optionValue: number;

  createdAt: Date;

  updatedAt: Date;
}

export class OptionModel extends BaseModel implements OptionProps {
  id: number;

  question: any;

  optionText: string;

  optionValue: number;

  createdAt: Date;

  updatedAt: Date;
  constructor(props?: OptionProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
