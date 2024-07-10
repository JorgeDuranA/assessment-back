import {
  AssessmentModel,
  AssessmentProps,
} from '@/assessments/domain/models/Assessment.model';

export interface IAssessmentRepository {
  findOneById(id: number): Promise<AssessmentModel>;
  save(assessment: AssessmentProps, id?: number): Promise<AssessmentModel>;
  findAll(): Promise<AssessmentModel[]>;
  updateById(
    id: number,
    update: Partial<AssessmentProps>,
  ): Promise<AssessmentModel>;
}
