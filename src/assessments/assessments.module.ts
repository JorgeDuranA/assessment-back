import { Assessment } from '@/database/entities/Assessment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './application/services/answer.service';
import { AssessmentsService } from './application/services/assessments.service';
import { QuestionService } from './application/services/question.service';
import { InMemoryAnswerRepository } from './infrastructure/InMemoryAnswerRepository';
import { InMemoryAssessmentRepository } from './infrastructure/InMemoryAssessmentRepository';
import { InMemoryQuestionRepository } from './infrastructure/InMemoryQuestionRepository';
import { AssessmentController } from './infrastructure/nest/controllers/assessments.controller';
import SymbolsAssessments from './symbols';

@Module({
  controllers: [AssessmentController],
  imports: [TypeOrmModule.forFeature([Assessment])],
  providers: [
    {
      provide: SymbolsAssessments.IAssessmentsRepository,
      useClass: InMemoryAssessmentRepository,
    },
    {
      provide: SymbolsAssessments.IAssessmentsService,
      useClass: AssessmentsService,
    },
    {
      provide: SymbolsAssessments.IQuestionRepository,
      useClass: InMemoryQuestionRepository,
    },
    {
      provide: SymbolsAssessments.IQuestionService,
      useClass: QuestionService,
    },
    {
      provide: SymbolsAssessments.IAnswerService,
      useClass: AnswerService,
    },
    {
      provide: SymbolsAssessments.IAnswerRepository,
      useClass: InMemoryAnswerRepository,
    },
  ],
  exports: [AssessmentsModule, SymbolsAssessments.IAssessmentsService],
})
export class AssessmentsModule {}
