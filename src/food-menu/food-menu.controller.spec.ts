import { Test, TestingModule } from '@nestjs/testing';
import { FoodMenuController } from './food-menu.controller';
import { FoodMenuService } from './food-menu.service';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';

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

describe('FoodMenuController', () => {
  let foodMenuController: FoodMenuController;
  let foodMenuService: FoodMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodMenuService,
        {
          provide: getRepositoryToken(Food),
          useFactory: repositoryMockFactory,
        },
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2(),
        },
      ],
      controllers: [FoodMenuController],
    }).compile();

    foodMenuService = module.get<FoodMenuService>(FoodMenuService);
    foodMenuController = module.get<FoodMenuController>(FoodMenuController);
  });

  // Definition of a test suite
  describe('getMenuItems', () => {
    // Definition of a test case
    it('should return an array of meals', async () => {
      const result = [{ id: 1, name: 'Meal', price: 28 }];
      jest
        .spyOn(foodMenuService, 'getMenuItems')
        .mockImplementation(async () => result);

      expect(await foodMenuController.getMenuItems()).toBe(result);
    });
  });

  describe('createMenuItem', () => {
    it('should return the new meal created in the database', async () => {
      const createItemDto = {
        name: 'someProduct',
        price: 10,
      };

      const result = await foodMenuController.createMenuItem(createItemDto);

      expect(result).toEqual({ name: 'someProduct', price: 10 });
    });
  });
});
