import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class SummaryFiltersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateStart: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateEnd: string;
}
