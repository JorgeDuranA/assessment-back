import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assessment } from './Assessment.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment, (assessment) => assessment.id)
  assessment: Assessment;

  @Column()
  questionText: string;

  @Column()
  questionType: string; // single_choice or multiple_choice

  @Column()
  step: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
