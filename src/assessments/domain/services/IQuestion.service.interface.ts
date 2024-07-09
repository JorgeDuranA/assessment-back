import { QuestionModel, QuestionProps } from '../models/Question.model';

export interface IQuestionService {
  getQuestions(): Promise<QuestionModel[]>;
  createQuestion(question: QuestionProps): Promise<QuestionModel>;
  getQuestionsByAssessment(assessmentId: number): Promise<QuestionModel[]>;
}
