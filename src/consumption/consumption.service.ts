import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ConsumptionRecord } from './consumption.entity';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(ConsumptionRecord)
    private readonly consumptionRepository: Repository<ConsumptionRecord>,
  ) {}

  async createRecord(data: CreateConsumptionRecordDto): Promise<ConsumptionRecord> {
    const record = this.consumptionRepository.create(data);
    return await this.consumptionRepository.save(record);
  }

  async getHistory(userId: string, startDate: string, endDate: string): Promise<ConsumptionRecord[]> {
    return await this.consumptionRepository.find({
      where: {
        userId,
        date: Between(new Date(startDate), new Date(endDate)),
      },
      order: { date: 'ASC' },
    });
  }

  async checkForAlert(userId: string): Promise<boolean> {
    const records = await this.consumptionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
      take: 2,
    });

    if (records.length < 2) return false;

    const [current, previous] = records;
    return current.waterUsage > previous.waterUsage;
  }
}
