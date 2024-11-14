import { IsDateString } from 'class-validator';

export class GetHistoryDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
