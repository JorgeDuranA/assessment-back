import { QuestionModel } from '@/assessments/domain/models/Question.model';
import { IQuestionRepository } from '@/assessments/domain/repositories/IQuestion.repository.interface';
import { IQuestionService } from '@/assessments/domain/services/IQuestion.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject(SymbolsAssessments.IQuestionRepository)
    private questionRepository: IQuestionRepository,
  ) {}

  async createQuestion(question: QuestionModel): Promise<QuestionModel> {
    const newQuestion = await this.questionRepository.create(question);
    return newQuestion;
  }

  async getQuestions(): Promise<QuestionModel[]> {
    const questions = await this.questionRepository.findAll();
    return questions;
  }

  async getQuestionsByAssessment(
    assessmentId: number,
  ): Promise<QuestionModel[]> {
    const questions = await this.questionRepository.findByAssessment(
      assessmentId,
    );
    return questions;
  }
}
