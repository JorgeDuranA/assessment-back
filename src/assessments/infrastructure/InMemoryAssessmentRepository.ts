import { Injectable, Logger } from '@nestjs/common';
import {
  AssessmentModel,
  AssessmentProps,
} from '../domain/models/Assessment.model';
import { IAssessmentRepository } from '../domain/repositories/IAssement.repository.interface';

let assessments: AssessmentModel[] = [];

@Injectable()
export class InMemoryAssessmentRepository implements IAssessmentRepository {
  private readonly logger = new Logger();

  async save(
    assessment: AssessmentProps,
    id?: number,
  ): Promise<AssessmentModel> {
    this.logger.log('Saving assessment');
    if (id) {
      const result = this.updateById(id, assessment);
      this.logger.log('id detected');
      return result;
    }
    const newAssessment = new AssessmentModel(assessment);
    newAssessment.id = Math.floor(Math.random() * 1000000);
    assessments.push(newAssessment);
    return this.findOneById(newAssessment.id);
  }

  async findOneById(id: number): Promise<AssessmentModel> {
    const result = await assessments.find((assess) => assess.id === id);

    if (result) {
      return result;
    }
  }

  async findAll(): Promise<AssessmentModel[]> {
    return assessments;
  }

  async updateById(
    id: number,
    update: AssessmentProps,
  ): Promise<AssessmentModel> {
    const assessment = await this.findOneById(id);
    assessments = assessments.map((ass) =>
      ass.id === assessment.id
        ? new AssessmentModel({ ...ass, ...update })
        : ass,
    );
    return await this.findOneById(id);
  }
}
