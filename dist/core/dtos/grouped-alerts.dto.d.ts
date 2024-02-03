import { Alert } from '../entities/alert.entity';
export declare class GroupedAlertsDto {
    date: string;
    damages: number[];
    maxDamageEvent: Alert;
    minDamageEvent: Alert;
    avgDamage?: number;
}
