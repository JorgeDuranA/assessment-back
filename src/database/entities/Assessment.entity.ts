import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  q1LittleInterest: number;

  @Column()
  q2FeelingDown: number;

  @Column()
  q3TroubleSleeping: number;

  @Column()
  q4FeelingTired: number;

  @Column()
  q5PoorAppetite: number;

  @Column()
  q6FeelingBadAboutSelf: number;

  @Column()
  q7TroubleConcentrating: number;

  @Column()
  q8MovingOrSpeakingSlowly: number;

  @Column()
  q9: number; // consider removing or renaming

  @Column()
  q10FeelingNervous: number;

  @Column()
  q11NotBeingAbleToStopWorrying: number;

  @Column()
  q12WorryingTooMuch: number;

  @Column()
  q13TroubleRelaxing: number;

  @Column()
  q14BeingRestless: number;

  @Column()
  q15FeelingAnnoyedOrIrritable: number;

  @Column()
  q16FeelingAfraid: number;

  @Column()
  currentStep: number;

  @Column()
  nextStep: number;
}
