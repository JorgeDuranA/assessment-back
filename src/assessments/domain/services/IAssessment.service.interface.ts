import { CreateAssessmentDto } from '@/assessments/application/dtos/CreateAssessment';
import { AssessmentModel } from '../models/Assessment.model';

export interface IAssessmentService {
  save(assessment: CreateAssessmentDto, id?: number): Promise<AssessmentModel>;
  getAll(): Promise<AssessmentModel[]>;
}
