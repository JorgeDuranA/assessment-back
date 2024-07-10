import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './Question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @Column()
  answerText: string;

  @Column('numeric', { precision: 10, scale: 2 })
  answerValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
