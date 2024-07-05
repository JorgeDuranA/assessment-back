import { Assessment } from '@/database/entities/Assessment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsService } from './application/services/assessments.service';
import { InMemoryAssessmentRepository } from './infrastructure/InMemoryAssessmentRepository';
import { AssessmentController } from './infrastructure/nest/assessments.controller';
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
  ],
  exports: [AssessmentsModule, SymbolsAssessments.IAssessmentsService],
})
export class AssessmentsModule {}
