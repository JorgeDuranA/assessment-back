import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IQuestionService } from '@/questions/domain/services/IQuestion.service.interface';
import SymbolsQuestion from '@/questions/symbol';
import { Question } from './dtos/response/question.response.dto';

@ApiTags('Question')
@Controller('questions')
/*
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@UseGuards(AuthGuard('api-key'))
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  status: 401,
  type: unauthorizedResponse,
})
*/
export class QuestionController {
  constructor(
    @Inject(SymbolsQuestion.IQuestionService)
    private readonly questionService: IQuestionService,
  ) {}

  @ApiOperation({
    summary: 'Find all questions in database',
    description: 'Endpoint to get all questions saved in database',
  })
  @ApiResponse({
    isArray: true,
    type: Question,
    status: 200,
  })
  @Get('/all')
  async findAllQuestions() {
    return await this.questionService.getAll();
  }
}
