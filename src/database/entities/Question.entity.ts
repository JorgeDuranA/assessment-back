import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer.entity';
import { Assessment } from './Assessment.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment, (assessment) => assessment.id, { cascade: true })
  assessment: Assessment;

  @OneToMany(() => Answer, (answer) => answer.id, { cascade: true })
  answers: Answer[];

  @Column('simple-array', { nullable: true })
  options: string[];

  @Column()
  questionText: string;

  @Column()
  step: number;
}
