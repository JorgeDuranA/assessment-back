import { Injectable, Logger } from '@nestjs/common';

import {
  QuestionModel,
  QuestionProps,
} from '@/assessments/domain/models/Question.model';
import { IQuestionRepository } from '@/assessments/domain/repositories/IQuestion.repository.interface';
import { Assessment } from '@/database/entities/Assessment.entity';
import { Question } from '@/database/entities/Question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Assessment)
    private readonly questionDB: Repository<Question>,
  ) {}

  async create(question: QuestionProps): Promise<QuestionModel> {
    this.logger.log('Saving assessment');
    const result = this.questionDB.create({
      ...question,
    });
    return this.findOneById(result.id);
  }

  async findOneById(id: number): Promise<QuestionModel> {
    const result = await this.questionDB.findOne({
      where: {
        id,
      },
    });

    if (result) {
      return new QuestionModel({
        id: result.id,
        step: result.step,
        question: result.questionText,
        assessment: result.assessment,
        options: [],
      });
    }
  }

  async findAll(): Promise<QuestionModel[]> {
    const result = await this.questionDB.find();
    return result.map(
      (question) =>
        new QuestionModel({
          id: question.id,
          step: question.step,
          question: question.questionText,
          assessment: question.assessment,
          options: [],
        }),
    );
  }

  async updateById(id: number, update: QuestionProps): Promise<QuestionModel> {
    const result = await this.findOneById(id);
    if (result) {
      await this.questionDB.update(id, {
        ...update,
      });

      const updated = this.findOneById(id);
      return updated;
    }
  }

  async findByAssessment(assessmentId: number): Promise<QuestionModel[]> {
    const result = await this.questionDB.find({
      where: {
        id: assessmentId,
      },
    });

    return result.map(
      (res) =>
        new QuestionModel({
          id: res.id,
          step: res.step,
          question: res.questionText,
          assessment: res.assessment,
          options: [],
        }),
    );
  }

  async findByStep(step: number): Promise<QuestionModel[]> {
    const result = await this.questionDB.find({
      where: {
        step,
      },
    });

    return result.map(
      (res) =>
        new QuestionModel({
          id: res.id,
          step: res.step,
          question: res.questionText,
          assessment: res.assessment,
          options: [],
        }),
    );
  }
}
