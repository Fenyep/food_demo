import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Food } from './entities/food.entity';
import { FoodMenuService } from './food-menu.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodMenuEvents } from '../enums/enums';
import { NewMealEvent } from '../events/new-meal.event';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  save: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  findOne: jest.fn((entity) => entity),
  deleteOne: jest.fn((entity) => entity),
}));

const eventEmitterMockFactory: () => MockType<EventEmitter2> = jest.fn(() => ({
  emit: jest.fn((entity) => entity),
}));

const createMealDto = {
  name: 'Meal test',
  price: 28,
};

describe('FoodMenuService', () => {
  let foodMenuService: FoodMenuService;
  let repositoryMock: MockType<Repository<Food>>;
  let eventEmitterMock: MockType<EventEmitter2>;

  beforeEach(async () => {
    //
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodMenuService,
        {
          provide: getRepositoryToken(Food),
          useFactory: repositoryMockFactory,
        },
        {
          provide: EventEmitter2,
          useFactory: eventEmitterMockFactory,
        },
      ],
    }).compile();

    foodMenuService = module.get<FoodMenuService>(FoodMenuService);
    repositoryMock = await module.get(getRepositoryToken(Food));
    eventEmitterMock = await module.get(EventEmitter2);
  });

  describe('createMenuItem', () => {
    it('should create a new menu item and emit a NewMealEvent', async () => {
      // Verifying that these function hasn't yet been called
      expect(repositoryMock.create).not.toHaveBeenCalled();
      expect(repositoryMock.save).not.toHaveBeenCalled();
      expect(eventEmitterMock.emit).not.toHaveBeenCalled();

      const result = await foodMenuService.createMenuItem(
        createMealDto.name,
        createMealDto.price,
      );

      // Verifying that the values saved have the correct value
      expect(result.name).toEqual(createMealDto.name);
      expect(result.price).toEqual(createMealDto.price);

      // Verifying that the create & save functions have been called with the good parameters
      expect(repositoryMock.create).toHaveBeenCalledWith(createMealDto);
      expect(repositoryMock.save).toHaveBeenCalledWith(createMealDto);

      // Verifies that the emit function has been effectively called
      expect(eventEmitterMock.emit).toHaveBeenCalledWith(
        FoodMenuEvents.newmeal,
        new NewMealEvent(result.name),
      );
    });
  });

  describe('getMenuItems', () => {
    it('should give a list of meals from the database', async () => {
      // Saying that the function find should return someProduct
      repositoryMock.find.mockReturnValue('someProduct');
      // Ensures that the function hasn't yet been called
      expect(repositoryMock.find).not.toHaveBeenCalled();
      // Execte the service function
      const result = await foodMenuService.getMenuItems();
      // Verifies the function effectively returns the desired value
      expect(result).toEqual('someProduct');
    });
  });

  // it('should initialize foodRepo correctly', () => {
  //   expect(foodMenuService['foodRepo']).toBe(repositoryMock);
  // });

  // it('should initialize eventEmitter correctly', () => {
  //   expect(foodMenuService['eventEmitter']).toBe(eventEmitterMock);
  // });
});
