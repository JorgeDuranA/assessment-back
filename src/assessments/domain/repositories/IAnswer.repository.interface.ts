import { AnswerModel, AnswerProps } from '../models/Answer.model';

export interface IAnswerRepository {
  create(answer: AnswerProps): Promise<AnswerModel>;
  findAll(): Promise<AnswerModel[]>;
}
