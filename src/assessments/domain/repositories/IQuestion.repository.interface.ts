import { QuestionModel } from '../models/Question.model';

export interface IQuestionRepository {
  findAll(): Promise<QuestionModel[]>;
  create(question: QuestionModel): Promise<QuestionModel>;
  findByAssessment(assessmentId: number): Promise<QuestionModel[]>;
  findByStep(assessmentId: number, step: number): Promise<QuestionModel[]>;
  findById(assessmentId: number, id: number): Promise<QuestionModel>;
}
