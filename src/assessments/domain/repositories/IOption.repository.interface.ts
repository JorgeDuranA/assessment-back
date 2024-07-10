import { OptionModel } from '../models/Option.model';

// OptionRepository interface
export interface OptionRepository {
  findAll(): Promise<OptionModel[]>;
  findOne(id: number): Promise<OptionModel | null>;
  create(option: OptionModel): Promise<OptionModel>;
  update(option: OptionModel): Promise<OptionModel>;
  delete(id: number): Promise<void>;
  findByQuestion(questionId: number): Promise<OptionModel[]>;
}
