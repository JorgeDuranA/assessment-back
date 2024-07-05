import { QuestionModel } from '../models/Question.model';

export interface IQuestionRepository {
  findAll(): Promise<QuestionModel[]>;
}
