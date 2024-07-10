export interface CreateAssessmentDto {
  id: number;

  title: string;

  description: string;

  currentStep: number;
  nextStep: number;

  createdAt: Date;

  updatedAt: Date;
}
