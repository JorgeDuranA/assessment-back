import { QuestionModel } from '@/questions/domain/models/Question.model';
import { ApiProperty } from '@nestjs/swagger';

export class Question extends QuestionModel {
  @ApiProperty()
  questionText: string;

  @ApiProperty()
  step: number;
}
