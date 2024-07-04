import { QuestionModel } from '../models/Question.model';

export interface IQuestionService {
  getAll(): Promise<QuestionModel[]>;
}
