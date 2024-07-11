import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assessment } from './Assessment.entity';
import { Question } from './Question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @Column({ nullable: true })
  answerText: string;

  @Column({ nullable: true })
  answerValue: number;

  @ManyToOne(() => Assessment, (assessment) => assessment.id)
  assessment: Assessment;
}
