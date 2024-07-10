import { QuestionModel, QuestionProps } from '../models/Question.model';

export interface IQuestionService {
  getQuestions(): Promise<QuestionModel[]>;
  createQuestion(question: QuestionProps): Promise<QuestionModel>;
  getQuestionsByAssessment(assessmentId: number): Promise<QuestionModel[]>;
  findById(assessmentId: number, id: number): Promise<QuestionModel>;
  findByStep(assessmentId: number, step: number): Promise<QuestionModel[]>;
}
