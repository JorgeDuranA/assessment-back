import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './Answer.entity';
import { Question } from './Question.entity';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Question, (question) => question.id)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.id)
  answers: Answer[];
}
