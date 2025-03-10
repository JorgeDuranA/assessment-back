import {
  AssessmentModel,
  AssessmentProps,
} from '@/assessments/domain/models/Assessment.model';
import { IAssessmentRepository } from '@/assessments/domain/repositories/IAssement.repository.interface';
import { IAssessmentService } from '@/assessments/domain/services/IAssessment.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from '../dtos/CreateAssessment';

@Injectable()
export class AssessmentsService implements IAssessmentService {
  constructor(
    @Inject(SymbolsAssessments.IAssessmentsRepository)
    private AssessmentRepository: IAssessmentRepository,
  ) {}

  async save(assessment: CreateAssessmentDto): Promise<AssessmentModel> {
    const newAssessment = await this.AssessmentRepository.save(assessment);
    return newAssessment;
  }

  async getAll(): Promise<AssessmentModel[]> {
    const assessments = await this.AssessmentRepository.findAll();
    return assessments;
  }

  async update(id: number, assessment: Partial<AssessmentProps>) {
    const updatedAssessment = await this.AssessmentRepository.updateById(
      id,
      assessment,
    );
    return updatedAssessment;
  }
}
