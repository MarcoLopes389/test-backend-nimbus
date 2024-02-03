import { Alert } from '../entities/alert.entity';

export class GroupedAlertsDto {
  date: string;
  damages: number[];
  maxDamageEvent: Alert;
  minDamageEvent: Alert;
  avgDamage?: number;
}
