import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Food } from './entities/food.entity';
import { FoodMenuService } from './food-menu.service';

describe('FoodMenuService', () => {
  let foodMenuService: FoodMenuService;
  let mockFoodRepo: Repository<Food>;
  let mockEventEmitter: EventEmitter2;

  beforeEach(() => {
    mockFoodRepo = {} as Repository<Food>;
    mockEventEmitter = {} as EventEmitter2;
    foodMenuService = new FoodMenuService(mockFoodRepo, mockEventEmitter);
  });

  it('should initialize foodRepo correctly', () => {
    expect(foodMenuService['foodRepo']).toBe(mockFoodRepo);
  });

  it('should initialize eventEmitter correctly', () => {
    expect(foodMenuService['eventEmitter']).toBe(mockEventEmitter);
  });
});
