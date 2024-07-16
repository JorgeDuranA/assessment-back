import { Injectable, Logger } from '@nestjs/common';
import { AnswerModel, AnswerProps } from '../../domain/models/Answer.model';
import { IAnswerRepository } from '../../domain/repositories/IAnswer.repository.interface';

const answers: AnswerModel[] = [];

@Injectable()
export class InMemoryAnswerRepository implements IAnswerRepository {
  private readonly logger = new Logger();

  async create(answer: AnswerProps): Promise<AnswerModel> {
    const newAnswer = new AnswerModel(answer);
    newAnswer.id = answers.length + 1;
    answers.push(newAnswer);
    return this.findOneById(newAnswer.id);
  }

  async findAll(): Promise<AnswerModel[]> {
    return answers;
  }

  async findOneById(id: number) {
    const result = await answers.find((an) => an.id === id);

    if (result) {
      return result;
    }
  }
}
