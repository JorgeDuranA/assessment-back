import { Inject, Injectable } from '@nestjs/common';

import { QuestionModel } from '@/questions/domain/models/Question.model';
import { IQuestionRepository } from '@/questions/domain/repositories/IQuestion.repository.interface';
import { IQuestionService } from '@/questions/domain/services/IQuestion.service.interface';
import SymbolQuestion from '@/questions/symbol';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject(SymbolQuestion.IQuestionRepository)
    private questionRepository: IQuestionRepository,
  ) {}

  async getAll(): Promise<QuestionModel[]> {
    const questions = await this.questionRepository.findAll();
    return questions;
  }
}
