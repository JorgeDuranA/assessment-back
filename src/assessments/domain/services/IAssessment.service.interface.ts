import { CreateAssessmentDto } from '@/assessments/application/dtos/CreateAssessment';
import { AssessmentModel, AssessmentProps } from '../models/Assessment.model';

export interface IAssessmentService {
  save(assessment: CreateAssessmentDto): Promise<AssessmentModel>;
  getAll(): Promise<AssessmentModel[]>;
  update(
    id: number,
    assessmnet: Partial<AssessmentProps>,
  ): Promise<AssessmentModel>;
}
