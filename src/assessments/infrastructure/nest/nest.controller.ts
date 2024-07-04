import { CreateAssessmentDto } from '@/assessments/application/dtos/CreateAssessment';
import { IAssessmentService } from '@/assessments/domain/services/IAssessment.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Assessment } from './dtos/response/assessments.responses.dto';

@Controller('assessments')
@ApiTags('assessment')
/*
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@UseGuards(AuthGuard('jwt'))
@UseGuards(AuthGuard('api-key'))
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  status: 401,
  type: unauthorizedResponse,
})
*/
export class NestController {
  constructor(
    @Inject(SymbolsAssessments.IAssessmentsService)
    private readonly assessmentService: IAssessmentService,
  ) {}

  @ApiOperation({
    summary: 'Save assessment in database',
    description: 'Endpoint to save assessments in database',
  })
  @ApiResponse({
    type: Assessment,
    status: 200,
  })
  @Post('/save')
  async saveAssessment(@Body() body: CreateAssessmentDto) {
    const assessment = await this.assessmentService.save(body, body.id);
    return {
      saved: true,
      currentStep: assessment.currentStep,
      nextStep: assessment.nextStep,
    };
  }

  @ApiOperation({
    summary: 'Retrieve all assessments in database',
    description: 'Endpoint to get all assessments in database',
  })
  @ApiResponse({
    type: Assessment,
    status: 200,
  })
  @Get('/all')
  async getAssessments() {
    return await this.assessmentService.getAll();
  }
}
