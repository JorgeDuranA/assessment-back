import {
  AnswerModel,
  AnswerProps,
} from '@/assessments/domain/models/Answer.model';
import { IAnswerRepository } from '@/assessments/domain/repositories/IAnswer.repository.interface';
import { IAnswerService } from '@/assessments/domain/services/IAnswer.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService implements IAnswerService {
  constructor(
    @Inject(SymbolsAssessments.IAnswerRepository)
    private answerRepository: IAnswerRepository,
  ) {}

  async createAnswer(answer: AnswerProps): Promise<AnswerModel> {
    const newAnswer = await this.answerRepository.create(answer);
    return newAnswer;
  }

  async findAll(): Promise<AnswerModel[]> {
    const answers = await this.answerRepository.findAll();
    return answers;
  }
}
