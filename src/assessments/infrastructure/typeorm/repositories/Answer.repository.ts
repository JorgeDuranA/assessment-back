import {
  AnswerModel,
  AnswerProps,
} from '@/assessments/domain/models/Answer.model';
import { IAnswerRepository } from '@/assessments/domain/repositories/IAnswer.repository.interface';
import { Answer } from '@/database/entities/Answer.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerRepository implements IAnswerRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Answer)
    private readonly answerDB: Repository<Answer>,
  ) {}

  async create(answer: AnswerProps): Promise<AnswerModel> {
    const a = new Answer();
    a.answerText = answer.answerText;
    a.answerValue = answer.answerValue;
    a.question = answer.question;
    a.assessment = answer.assessment;
    this.logger.log('Saving answer', JSON.stringify(a));
    const newAnswer = await this.answerDB.save(a);
    return this.findOneById(newAnswer.id);
  }

  async findAll(): Promise<AnswerModel[]> {
    return (
      await this.answerDB.find({
        relations: ['question', 'assessment'],
      })
    ).map(
      (a) =>
        new AnswerModel({
          answerText: a.answerText,
          answerValue: a.answerValue,
          question: a.question,
          assessment: a.assessment,
        }),
    );
  }

  async findOneById(id: number) {
    const result = await this.answerDB.findOne({
      where: {
        id,
      },
      relations: ['question', 'assessment'],
    });

    if (result) {
      const answer = new AnswerModel({
        answerText: result.answerText,
        answerValue: result.answerValue,
        question: result.question,
        assessment: result.assessment,
      });
      answer.id = result.id;
      return answer;
    }
  }
}
