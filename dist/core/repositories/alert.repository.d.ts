import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
export declare class AlertRepository {
    private readonly alertRepository;
    constructor(alertRepository: Repository<Alert>);
    findAllByDate(dateStart: string, dateEnd: string): Promise<Alert[]>;
}
