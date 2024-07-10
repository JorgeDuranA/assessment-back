export interface CreateQuestionDto {
  assessment: any;

  questionText: string;

  options: string[];

  step: number;
}
