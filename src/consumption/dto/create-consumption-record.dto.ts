import { IsDecimal, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateConsumptionRecordDto {
  @IsNotEmpty()
  userId: string;

  @IsDecimal()
  waterUsage: number;

  @IsDateString()
  date: string;
}
