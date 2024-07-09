import { AnswerModel, AnswerProps } from '../models/Answer.model';

export interface IAnswerService {
  createAnswer(answer: AnswerProps): Promise<AnswerModel>;
  findAll(): Promise<AnswerModel[]>;
}
