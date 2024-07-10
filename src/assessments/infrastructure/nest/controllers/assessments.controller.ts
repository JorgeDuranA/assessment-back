import { CreateAssessmentDto } from '@/assessments/application/dtos/CreateAssessment';
import { SaveAnswerDto } from '@/assessments/application/dtos/SaveAnswer';
import { COLORS } from '@/assessments/constants/colors';
import { LOGO_URI } from '@/assessments/constants/logo';
import { IAnswerService } from '@/assessments/domain/services/IAnswer.service.interface';
import { IAssessmentService } from '@/assessments/domain/services/IAssessment.service.interface';
import { IQuestionService } from '@/assessments/domain/services/IQuestion.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Assessment } from '../dtos/response/assessments.responses.dto';

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
export class AssessmentController {
  private readonly logger = new Logger();

  constructor(
    @Inject(SymbolsAssessments.IAssessmentsService)
    private readonly assessmentService: IAssessmentService,
    @Inject(SymbolsAssessments.IQuestionService)
    private readonly questionService: IQuestionService,
    @Inject(SymbolsAssessments.IAnswerService)
    private readonly answerService: IAnswerService,
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
      assessment,
    };
  }

  @ApiOperation({
    summary: 'Save assessment in database',
    description: 'Endpoint to save assessments in database',
  })
  @ApiResponse({
    status: 200,
  })
  @Put('/save')
  async saveAnswer(@Body() body: SaveAnswerDto) {
    if (body.multipleChoice) {
      body.values.forEach(async (val) => {
        await this.answerService.createAnswer({
          answerText: body.answerText,
          answerValue: val,
          question: body.questionId,
          assessment: body.assessmentId,
        });
      });
      return {
        saved: true,
      };
    }

    const answer = await this.answerService.createAnswer({
      answerText: body.answerText,
      answerValue: body.answerValue,
      question: body.questionId,
      assessment: body.assessmentId,
    });

    return {
      saved: true,
      answer,
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

  @ApiOperation({
    summary: 'Retrieve all answers in database',
    description: 'Endpoint to get all answers in database',
  })
  @ApiResponse({
    status: 200,
  })
  @Get('/answers/all')
  async getAnswers() {
    return await this.answerService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve company logo',
    description: 'Endpoint to retrive company logo',
  })
  @ApiResponse({
    type: Assessment,
    status: 200,
  })
  @Get('/logo')
  async getCompanyLogo() {
    return {
      logo: LOGO_URI,
    };
  }

  @ApiOperation({
    summary: 'Retrieve companys primary colors',
    description: 'Endpoint to companys primary colors',
  })
  @ApiResponse({
    type: Assessment,
    status: 200,
  })
  @Get('/colors')
  async getCompanyPrimaryColors() {
    return {
      buttonPrimaryColor: COLORS.BUTTON_PRIMARY_COLORS.BACKGROUND,
      buttonTextPrimaryColor: COLORS.BUTTON_PRIMARY_COLORS.TEXT,
    };
  }

  @ApiOperation({
    summary: 'Endpoint to retrieve all questions',
    description: 'Endpoint to retrieve all questions',
  })
  @ApiResponse({
    status: 200,
  })
  @Get('/questions')
  async getAllQuestions() {
    return await this.questionService.getQuestions();
  }

  @ApiOperation({
    summary: 'Retrieve a question by assessment ID',
    description: 'Endpoint to retrieve questions by assessment ID',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'assessmentId',
    description: 'The ID of the assessmet to retrieve questions',
    required: true,
    type: 'integer',
  })
  @Get('/questions/:assessmentId')
  async getQuestionById(@Param('assessmentId') assessmentId: number) {
    try {
      return await this.questionService.getQuestionsByAssessment(assessmentId);
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }
}
