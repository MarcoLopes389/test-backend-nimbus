import { AlertsReportDto } from '../dtos/alerts-report.dto';
import { AlertRepository } from '../repositories/alert.repository';
export declare class GetDamageSummaryByDateUseCase {
    private readonly alertRepository;
    constructor(alertRepository: AlertRepository);
    private groupDates;
    private calcAverageDamage;
    private fillNotFoundDates;
    execute(dateStart: string, dateEnd: string): Promise<AlertsReportDto[]>;
}
