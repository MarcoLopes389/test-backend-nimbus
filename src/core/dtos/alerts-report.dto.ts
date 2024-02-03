import { ApiProperty } from '@nestjs/swagger';

class DamageEventDto {
  @ApiProperty()
  damage: number;

  @ApiProperty()
  event: string;
}

export class AlertsReportDto {
  @ApiProperty()
  date: string;

  @ApiProperty({ type: DamageEventDto })
  maxDamageEvent: DamageEventDto;

  @ApiProperty({ type: DamageEventDto })
  minDamageEvent: DamageEventDto;

  @ApiProperty()
  avgDamage?: number;
}
