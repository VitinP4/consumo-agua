import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionRecordDto } from './dto/create-consumption-record.dto';

describe('ConsumptionController', () => {
  let controller: ConsumptionController;
  let service: ConsumptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionController],
      providers: [
        {
          provide: ConsumptionService,
          useValue: {
            createRecord: jest.fn().mockResolvedValue({
              id: 1,
              userId: '123',
              waterUsage: 15.5,
              date: '2024-11-14',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsumptionController>(ConsumptionController);
    service = module.get<ConsumptionService>(ConsumptionService);
  });

  it('should create a consumption record', async () => {
    const dto: CreateConsumptionRecordDto = {
      userId: '123',
      waterUsage: 15.5,
      date: '2024-11-14',
    };
    const result = await controller.createRecord(dto);

    expect(result).toEqual({
      id: 1,
      userId: '123',
      waterUsage: 15.5,
      date: '2024-11-14',
    });
    expect(service.createRecord).toHaveBeenCalledWith(dto);
  });
});
