import { Injectable, Logger } from '@nestjs/common';

import {
  QuestionModel,
  QuestionProps,
} from '@/assessments/domain/models/Question.model';
import { IQuestionRepository } from '@/assessments/domain/repositories/IQuestion.repository.interface';
import { Question } from '@/database/entities/Question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Question)
    private readonly questionDB: Repository<Question>,
  ) {}

  async create(question: QuestionProps): Promise<QuestionModel> {
    const q = new Question();

    q.assessment = question.assessment;
    q.questionText = question.questionText;
    q.options = question.options;
    q.step = question.step;
    this.logger.log('Saving assessment', JSON.stringify(q));
    const result = await this.questionDB.save(q);
    return this.findOneById(result.id);
  }

  async findOneById(id: number): Promise<QuestionModel> {
    const result = await this.questionDB.findOne({
      where: {
        id,
      },
      relations: ['assessment'],
    });

    if (result) {
      const q = new QuestionModel({
        step: result.step,
        questionText: result.questionText,
        assessment: result.assessment,
        options: result.options,
      });
      q.id = result.id;
      return q;
    }
  }

  async findAll(): Promise<QuestionModel[]> {
    const result = await this.questionDB.find({
      relations: ['assessment'],
    });
    return result.map(
      (question) =>
        new QuestionModel({
          step: question.step,
          questionText: question.questionText,
          assessment: question.assessment,
          options: question.options,
        }),
    );
  }

  async updateById(id: number, update: QuestionProps): Promise<QuestionModel> {
    const result = await this.findOneById(id);
    if (result) {
      //await this.questionDB.update(id, { ...update, options: update.options.map(option => ({ text: option })) });

      const updated = this.findOneById(id);
      return updated;
    }
  }

  async findByAssessment(assessmentId: number): Promise<QuestionModel[]> {
    const result = await this.questionDB.find({
      where: {
        assessment: {
          id: assessmentId,
        },
      },
      relations: ['assessment'],
    });

    return result.map(
      (res) =>
        new QuestionModel({
          step: res.step,
          questionText: res.questionText,
          assessment: res.assessment,
          options: res.options,
        }),
    );
  }

  async findById(assessmentId: number, id: number): Promise<QuestionModel> {
    const result = await this.questionDB.findOne({
      where: {
        id,
      },
      relations: ['assessment'],
    });

    if (result) {
      return new QuestionModel({
        step: result.step,
        questionText: result.questionText,
        assessment: result.assessment,
        options: [],
      });
    }
  }

  async findByStep(
    assessmentId: number,
    step: number,
  ): Promise<QuestionModel[]> {
    const result = await this.questionDB.find({
      where: {
        step,
        assessment: {
          id: assessmentId,
        },
      },
      relations: ['assessment'],
    });

    return result.map(
      (res) =>
        new QuestionModel({
          step: res.step,
          questionText: res.questionText,
          assessment: res.assessment,
          options: res.options,
        }),
    );
  }
}
