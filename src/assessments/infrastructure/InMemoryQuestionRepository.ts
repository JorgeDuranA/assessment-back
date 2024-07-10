import { Injectable, Logger } from '@nestjs/common';
import { QuestionModel, QuestionProps } from '../domain/models/Question.model';
import { IQuestionRepository } from '../domain/repositories/IQuestion.repository.interface';

const questions = [
  {
    id: 1,
    assessment: 1,
    question: '1. Little interest or pleasure in doing things',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 1,
  },
  {
    id: 2,
    assessment: 1,
    question: '2. Feeling down, depressed, or hopeless',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 2,
  },
  {
    id: 3,
    assessment: 1,
    question: '3. Trouble falling or staying asleep, or sleeping too much',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 3,
  },
  {
    id: 4,
    assessment: 1,
    question: '4. Feeling tired or having little energy',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 4,
  },
  {
    id: 5,
    assessment: 1,
    question: '5. Poor appetite or overeating',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 5,
  },
  {
    id: 6,
    assessment: 1,
    question:
      '6. Feeling bad about yourself or that you are a failure or have let yourself or your family down',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 6,
  },
  {
    id: 7,
    assessment: 1,
    question:
      '7. Trouble concentrating on things, such as reading the newspaper or watching television',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 7,
  },
  {
    id: 8,
    assessment: 1,
    question:
      '8. Moving or speaking so slowly that other people could have noticed. Or the opposite -- being so fidgety or restless that you have been moving around a lot more than usual',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 8,
  },
  {
    id: 9,
    assessment: 1,
    question:
      '9. Moving or speaking so slowly that other people could have noticed. Or the opposite -- being so fidgety or restless that you have been moving around a lot more than usual',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 9,
  },
  {
    id: 10,
    assessment: 1,
    question: '10. Feeling nervous, anxious, or on edge',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 10,
  },
  {
    id: 11,
    assessment: 1,
    question: '11. Not being able to stop or control worrying',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 11,
  },
  {
    id: 12,
    assessment: 1,
    question: '12. Worrying too much about different things',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 12,
  },
  {
    id: 13,
    assessment: 1,
    question: '13. Trouble relaxing',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 13,
  },
  {
    id: 14,
    assessment: 1,
    question: '14. Being so restless that it is hard to sit still',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 14,
  },
  {
    id: 15,
    assessment: 1,
    question: '15. Becoming easily annoyed or irritable',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 15,
  },
  {
    id: 16,
    assessment: 1,
    question: '16. Feeling afraid, as if something awful might happen',
    options: [
      'Not at all',
      'Several days',
      'More than half the days',
      'Nearly every day',
    ],
    step: 16,
  },
  {
    id: 17,
    assessment: 2,
    question:
      'Just like having the flu disrupts our physical strength, there are things that disrupt our mental well-being making it not as strong as we would like. Sadly, many people are struggling right now not feeling as happy as they want. That’s the bad news. The good news is there are skills we can learn to help us feel better. And that is exactly what I am going to teach you over the next 4 weeks together. Before we do that, let’s get an even better sense about where you are right now.',
    options: [],
    step: 0,
  },
  {
    id: 18,
    assessment: 2,
    question: '1. How happy are you at work?',
    options: ['Very Happy', 'Happy', 'Neutral', 'Unhappy', 'Very Unhappy'],
    step: 1,
  },
  {
    id: 19,
    assessment: 2,
    question: '2. How pleased are you with your mental well-being?',
    options: [
      'Completely satisfied',
      'Pretty pleased',
      'Moderately',
      'A little',
      'Not at all',
    ],
    step: 2,
  },
  {
    id: 20,
    assessment: 2,
    question: '3. How often do you feel burned out at work?',
    options: [
      'Never',
      '1-2 times per month',
      'Weekly',
      'Most days',
      'Almost all the time',
    ],
    step: 3,
  },
  {
    id: 21,
    assessment: 2,
    question:
      '4. What would you like to change when it comes to your mental wellness?',
    options: [
      'Less sadness',
      'Less stress',
      'Less anxiety',
      'Less angry/irritable',
      'Greater happiness',
    ],
    step: 4,
  },
  {
    id: 22,
    assessment: 2,
    question:
      'On a scale from 0 (no sadness at all) to 10 (the saddest you have ever been), what has been your average level of sadness over the past week?',
    options: [],
    step: 5,
  },
  {
    id: 23,
    assessment: 2,
    question:
      'On a scale from 0 (no stress at all) to 10 (the most stressed you have ever been), what has been your average level of stress over the past week?',
    options: [],
    step: 6,
  },
  {
    id: 24,
    assessment: 2,
    question:
      'On a scale from 0 (no anxiety at all) to 10 (the most anxious you have ever been), what has been your average level of anxiety over the past week?',
    options: [],
    step: 7,
  },
  {
    id: 25,
    assessment: 2,
    question:
      'On a scale from 0 (no anger or irritability at all) to 10 (the most angry and irritable you have ever been), what has been your average level of anger or irritability over the past week?',
    options: [],
    step: 8,
  },
  {
    id: 26,
    assessment: 2,
    question:
      'On a scale from 0 (no happiness at all) to 10 (the happiest you have ever been), what has been your average level of happiness over the past week?',
    options: [],
    step: 9,
  },
];

@Injectable()
export class InMemoryQuestionRepository implements IQuestionRepository {
  private readonly logger = new Logger();

  async create(question: QuestionProps): Promise<QuestionModel> {
    const newQuestion = new QuestionModel(question);
    newQuestion.id = questions.length + 1;
    questions.push(newQuestion);
    return newQuestion;
  }

  async findAll(): Promise<QuestionModel[]> {
    this.logger.log('Finding all questions');
    return questions.map((question) => new QuestionModel(question));
  }

  async findById(assessmentId: number, id: number): Promise<QuestionModel> {
    this.logger.log('Finding by id ' + id);
    return new QuestionModel(
      questions.find((q) => q.id == id && q.assessment == assessmentId),
    );
  }

  async findByAssessment(assessmentId: number): Promise<QuestionModel[]> {
    this.logger.log('Finding all by assessment ' + assessmentId);

    return questions
      .map((question) => new QuestionModel(question))
      .filter((q) => q.assessment == assessmentId);
  }

  async findByStep(
    assessmentId: number,
    step: number,
  ): Promise<QuestionModel[]> {
    return questions
      .filter(
        (question) =>
          question.step == step && assessmentId == question.assessment,
      )
      .map((question) => new QuestionModel(question));
  }
}
