import { AssessmentModel } from '@/assessments/domain/models/Assessment.model';
import { ApiProperty } from '@nestjs/swagger';

export class Assessment extends AssessmentModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  q1LittleInterest: number;

  @ApiProperty()
  q2FeelingDown: number;

  @ApiProperty()
  q3TroubleSleeping: number;

  @ApiProperty()
  q4FeelingTired: number;

  @ApiProperty()
  q5PoorAppetite: number;

  @ApiProperty()
  q6FeelingBadAboutSelf: number;

  @ApiProperty()
  q7TroubleConcentrating: number;

  @ApiProperty()
  q8MovingOrSpeakingSlowly: number;

  @ApiProperty()
  q9: number; // consider removing or renaming

  @ApiProperty()
  q10FeelingNervous: number;

  @ApiProperty()
  q11NotBeingAbleToStopWorrying: number;

  @ApiProperty()
  q12WorryingTooMuch: number;

  @ApiProperty()
  q13TroubleRelaxing: number;

  @ApiProperty()
  q14BeingRestless: number;

  @ApiProperty()
  q15FeelingAnnoyedOrIrritable: number;

  @ApiProperty()
  q16FeelingAfraid: number;
}
