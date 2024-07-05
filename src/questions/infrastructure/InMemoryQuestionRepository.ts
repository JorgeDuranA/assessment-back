import { Injectable, Logger } from '@nestjs/common';
import { QuestionModel } from '../domain/models/Question.model';
import { IQuestionRepository } from '../domain/repositories/IQuestion.repository.interface';

const questions = [
  '1. Little interest or pleasure in doing things',
  '2. Feeling down, depressed, or hopeless',
  '3. Trouble falling or staying asleep, or sleeping too much',
  '4. Feeling tired or having little energy',
  '5. Poor appetite or overeating',
  '6. Feeling bad about yourself or that you are a failure or have let yourself or your family down',
  '7. Trouble concentrating on things, such as reading the newspaper or watching television',
  '8. Moving or speaking so slowly that other people could have noticed. Or the opposite -- being so fidgety or restless that you have been moving around a lot more than usual',
  '8. Moving or speaking so slowly that other people could have noticed. Or the opposite -- being so fidgety or restless that you have been moving around a lot more than usual',
  '10. Feeling nervous, anxious, or on edge',
  '11. Not being able to stop or control worrying',
  '12. Worrying too much about different things',
  '13. Trouble relaxing',
  '14. Being so restless that it is hard to sit still',
  '15. Becoming easily annoyed or irritable',
  '16. Feeling afraid, as if something awful might happen',
];

@Injectable()
export class InMemoryQuestionRepository implements IQuestionRepository {
  private readonly logger = new Logger();

  async findAll(): Promise<QuestionModel[]> {
    return questions.map(
      (question, index) =>
        new QuestionModel({
          questionText: question,
          step: index + 1,
          nextStep: index >= 15 ? 0 : index + 2,
        }),
    );
  }
}
