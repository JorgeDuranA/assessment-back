export interface SaveAnswerDto {
  questionId: number;
  assessmentId: number;

  answerText?: string;

  answerValue?: number;

  multipleChoice?: boolean;

  values?: number[];
}
