import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionRecord } from './consumption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionRecord])],
  providers: [ConsumptionService],
  controllers: [ConsumptionController],
})
export class ConsumptionModule {}
