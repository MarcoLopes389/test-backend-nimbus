import { Controller, Get, Query } from '@nestjs/common';
import { GetDamageSummaryByDateUseCase } from '../use-cases/get-damage-summary-by-date.use-case';
import { SummaryFiltersDto } from '../dtos/summary-filters.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AlertsReportResultDto } from '../dtos/alerts-report-result.dto';

@Controller()
export class AlertController {
  constructor(
    private readonly getDamageSummaryByDateUseCase: GetDamageSummaryByDateUseCase,
  ) {}

  @ApiOkResponse({ type: AlertsReportResultDto })
  @Get('/damage-summary-by-date')
  async damageSummaryByDate(@Query() query: SummaryFiltersDto) {
    const report = await this.getDamageSummaryByDateUseCase.execute(
      query.dateStart,
      query.dateEnd,
    );

    return {
      data: report,
    };
  }
}
