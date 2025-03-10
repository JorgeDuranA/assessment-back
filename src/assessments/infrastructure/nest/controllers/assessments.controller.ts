import { CreateAssessmentDto } from '@/assessments/application/dtos/CreateAssessment';
import { CreateQuestionDto } from '@/assessments/application/dtos/CreateQuestion';
import { SaveAnswerDto } from '@/assessments/application/dtos/SaveAnswer';
import { CreateBrandingDto } from '@/assessments/application/dtos/createBranding';
import { IAnswerService } from '@/assessments/domain/services/IAnswer.service.interface';
import { IAssessmentService } from '@/assessments/domain/services/IAssessment.service.interface';
import { IBrandingService } from '@/assessments/domain/services/IBranding.service.interface';
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
    @Inject(SymbolsAssessments.IBrandingService)
    private readonly brandingService: IBrandingService,
  ) {}

  @ApiOperation({
    summary: 'Save assessment in database',
    description: 'Endpoint to save assessments in database',
  })
  @ApiResponse({
    type: Assessment,
    status: 200,
  })
  @Post('/create')
  async saveAssessment(@Body() body: CreateAssessmentDto) {
    const assessment = await this.assessmentService.save(body);
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
    type: Assessment,
    status: 200,
  })
  @Post('/create')
  async createAssessment(@Body() body: CreateAssessmentDto) {
    const assessment = await this.assessmentService.save(body);
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
    const [brand] = await this.brandingService.findAll();
    return { logo: brand.logo };
  }

  @ApiOperation({
    summary: 'Create branding',
    description: 'Create branding',
  })
  @ApiResponse({
    status: 201,
  })
  @Post('/branding')
  async createNewBranding(@Body() body: CreateBrandingDto) {
    const brand = await this.brandingService.save({
      logo: body.logo,
      primaryColorBtn: body.primaryColorBtn,
      primaryColorText: body.primaryColorText,
    });
    return {
      saved: true,
      brand,
    };
  }

  @ApiOperation({
    summary: 'Retrieve companys primary colors',
    description: 'Endpoint to companys primary colors',
  })
  @ApiResponse({
    status: 200,
  })
  @Get('/colors')
  async getCompanyPrimaryColors() {
    const [brand] = await this.brandingService.findAll();
    return {
      primaryColorBtn: brand.primaryColorBtn,
      primaryColorText: brand.primaryColorText,
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
  async getQuestionByAssessment(@Param('assessmentId') assessmentId: number) {
    try {
      return await this.questionService.getQuestionsByAssessment(assessmentId);
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
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
  @ApiParam({
    name: 'questionId',
    description: 'The ID of the assessmet to retrieve questions',
    required: true,
    type: 'integer',
  })
  @Get('/questions/:assessmentId/:questionId')
  async getQuestionById(
    @Param('assessmentId') assessmentId: number,
    @Param('questionId') questionId: number,
  ) {
    try {
      return await this.questionService.findById(assessmentId, questionId);
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }

  @ApiOperation({
    summary: 'Retrieve a question by step',
    description: 'Endpoint to retrieve questions by step',
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
  @ApiParam({
    name: 'step',
    description: 'The step of the question to retrieve questions',
    required: true,
    type: 'integer',
  })
  @Get('/questions/step/:assessmentId/:step')
  async getQuestionByStep(
    @Param('assessmentId') assessmentId: number,
    @Param('step') step: number,
  ) {
    try {
      return await this.questionService.findByStep(assessmentId, step);
    } catch (error) {
      throw new HttpException('Question not found', 404);
    }
  }

  @ApiOperation({
    summary: 'Create a question',
    description: 'Create a question',
  })
  @ApiResponse({
    status: 201,
  })
  @Post('/questions')
  async createQuestion(@Body() body: CreateQuestionDto) {
    const question = await this.questionService.createQuestion(body);
    return {
      saved: true,
      question,
    };
  }
}
