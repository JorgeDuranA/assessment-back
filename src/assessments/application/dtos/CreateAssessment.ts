export interface CreateAssessmentDto {
  id?: number;

  q1LittleInterest: number;

  q2FeelingDown: number;

  q3TroubleSleeping: number;

  q4FeelingTired: number;

  q5PoorAppetite: number;

  q6FeelingBadAboutSelf: number;

  q7TroubleConcentrating: number;

  q8MovingOrSpeakingSlowly: number;

  q9: number; // consider removing or renaming

  q10FeelingNervous: number;

  q11NotBeingAbleToStopWorrying: number;

  q12WorryingTooMuch: number;

  q13TroubleRelaxing: number;

  q14BeingRestless: number;

  q15FeelingAnnoyedOrIrritable: number;

  q16FeelingAfraid: number;

  currentStep: number;
  nextStep: number;
}
