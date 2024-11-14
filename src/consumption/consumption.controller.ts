import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';
import { GetHistoryDto } from './dto/get-history.dto';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  async createRecord(@Body() data: CreateConsumptionRecordDto) {
    return await this.consumptionService.createRecord(data);
  }

  @Get('history/:userId')
  async getHistory(
    @Param('userId') userId: string,
    @Query() query: GetHistoryDto,
  ) {
    return await this.consumptionService.getHistory(userId, query.startDate, query.endDate);
  }

  @Get('alert/:userId')
  async getAlert(@Param('userId') userId: string): Promise<{ alert: boolean }> {
    const alert = await this.consumptionService.checkForAlert(userId);
    return { alert };
  }
}
