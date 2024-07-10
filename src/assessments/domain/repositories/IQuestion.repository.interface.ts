import { QuestionModel } from '../models/Question.model';

export interface IQuestionRepository {
  findAll(): Promise<QuestionModel[]>;
  create(question: QuestionModel): Promise<QuestionModel>;
  findByAssessment(assessmentId: number): Promise<QuestionModel[]>;
  findByStep(step: number): Promise<QuestionModel[]>;
}
