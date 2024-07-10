import { QuestionModel, QuestionProps } from '../models/Question.model';

export interface IQuestionRepository {
  create(question: QuestionProps): Promise<QuestionModel>;
  findAll(): Promise<QuestionModel[]>;
}
