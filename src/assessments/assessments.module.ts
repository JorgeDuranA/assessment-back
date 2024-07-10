import { Assessment } from '@/database/entities/Assessment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './application/services/answer.service';
import { AssessmentsService } from './application/services/assessments.service';
import { QuestionService } from './application/services/question.service';
//import { InMemoryQuestionRepository } from './infrastructure/InMemoryQuestionRepository';
import { Answer } from '@/database/entities/Answer.entity';
import { Branding } from '@/database/entities/Branding.entity';
import { Question } from '@/database/entities/Question.entity';
import { BrandingService } from './application/services/branding.service';
import { AssessmentController } from './infrastructure/nest/controllers/assessments.controller';
import { AnswerRepository } from './infrastructure/typeorm/repositories/Answer.repository';
import { AssessmentRepository } from './infrastructure/typeorm/repositories/Assesment.repository';
import { BrandingRepository } from './infrastructure/typeorm/repositories/Branding.repository';
import { QuestionRepository } from './infrastructure/typeorm/repositories/Question.repository';
import SymbolsAssessments from './symbols';

@Module({
  controllers: [AssessmentController],
  imports: [TypeOrmModule.forFeature([Assessment, Question, Answer, Branding])],
  providers: [
    {
      provide: SymbolsAssessments.IAssessmentsRepository,
      useClass: AssessmentRepository,
    },
    {
      provide: SymbolsAssessments.IAssessmentsService,
      useClass: AssessmentsService,
    },
    {
      provide: SymbolsAssessments.IQuestionRepository,
      useClass: QuestionRepository,
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
      useClass: AnswerRepository,
    },
    {
      provide: SymbolsAssessments.IBrandingRepository,
      useClass: BrandingRepository,
    },
    {
      provide: SymbolsAssessments.IBrandingService,
      useClass: BrandingService,
    },
  ],
  exports: [AssessmentsModule, SymbolsAssessments.IAssessmentsService],
})
export class AssessmentsModule {}
