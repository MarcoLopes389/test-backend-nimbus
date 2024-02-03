import { GetDamageSummaryByDateUseCase } from '../use-cases/get-damage-summary-by-date.use-case';
import { SummaryFiltersDto } from '../dtos/summary-filters.dto';
export declare class AlertController {
    private readonly getDamageSummaryByDateUseCase;
    constructor(getDamageSummaryByDateUseCase: GetDamageSummaryByDateUseCase);
    damageSummaryByDate(query: SummaryFiltersDto): Promise<{
        data: import("../dtos/alerts-report.dto").AlertsReportDto[];
    }>;
}
