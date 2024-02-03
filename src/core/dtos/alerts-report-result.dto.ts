import { ApiProperty } from '@nestjs/swagger';
import { AlertsReportDto } from './alerts-report.dto';

export class AlertsReportResultDto {
  @ApiProperty({ type: AlertsReportDto, isArray: true })
  data: AlertsReportDto[];
}
