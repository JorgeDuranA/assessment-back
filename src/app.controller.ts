import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly appService: AppService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const healthCheckResult = await this.health.check([
      () => this.db.pingCheck('database'),
    ]);
    console.log(
      '🚀 ~ file: app.controller.ts:23 ~ AppController ~ check ~ healthCheckResult:',
      healthCheckResult,
    );

    return {
      datetime: new Date(),
      health: healthCheckResult.status,
    };
  }
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
