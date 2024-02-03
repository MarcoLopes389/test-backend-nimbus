declare class DamageEventDto {
    damage: number;
    event: string;
}
export declare class AlertsReportDto {
    date: string;
    maxDamageEvent: DamageEventDto;
    minDamageEvent: DamageEventDto;
    avgDamage?: number;
}
export {};
