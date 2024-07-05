import { Module } from '@nestjs/common';
import { QuestionService } from './application/services/question.service';
import { InMemoryQuestionRepository } from './infrastructure/InMemoryQuestionRepository';
import { QuestionController } from './infrastructure/nest/questions.controller';
import SymbolsQuestions from './symbol';

@Module({
  controllers: [QuestionController],
  providers: [
    {
      provide: SymbolsQuestions.IQuestionRepository,
      useClass: InMemoryQuestionRepository,
    },
    {
      provide: SymbolsQuestions.IQuestionService,
      useClass: QuestionService,
    },
  ],
  exports: [QuestionsModule, SymbolsQuestions.IQuestionService],
})
export class QuestionsModule {}
