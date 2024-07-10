import { Injectable, Logger } from '@nestjs/common';

import {
  AssessmentModel,
  AssessmentProps,
} from '@/assessments/domain/models/Assessment.model';
import { IAssessmentRepository } from '@/assessments/domain/repositories/IAssement.repository.interface';
import { Assessment } from '@/database/entities/Assessment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssessmentRepository implements IAssessmentRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentDB: Repository<Assessment>,
  ) {}

  async save(assessment: AssessmentProps): Promise<AssessmentModel> {
    const result = await this.assessmentDB.save({
      ...assessment,
    });
    this.logger.log('Saving assessment', JSON.stringify(result));

    return await this.findOneById(result.id);
  }

  async findOneById(id: number): Promise<AssessmentModel> {
    const result = await this.assessmentDB.findOne({
      where: {
        id,
      },
    });

    this.logger.log('finding assessment', JSON.stringify(result));

    if (result) {
      return new AssessmentModel({
        title: result.title,
        description: result.description,
      });
    }
  }

  async findAll(): Promise<AssessmentModel[]> {
    const result = await this.assessmentDB.find();
    return result.map((assessment) => new AssessmentModel(assessment));
  }

  async updateById(
    id: number,
    update: AssessmentProps,
  ): Promise<AssessmentModel> {
    const result = await this.findOneById(id);
    if (result) {
      await this.assessmentDB.update(id, {
        ...update,
      });

      const updated = this.findOneById(id);
      return updated;
    }
  }
}
