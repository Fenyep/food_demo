import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMenuItemDto } from './dtos/createMenuItem.dtos';
import { FoodMenuService } from './food-menu.service';
import { Food } from './entities/food.entity';

@Controller('food-menu')
export class FoodMenuController {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  /**
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  @Post()
  async createMenuItem(@Body() body: CreateMenuItemDto): Promise<Food> {
    return this.foodMenuService.createMenuItem(body.name, body.price);
  }

  /**
   * Retrieves the menu items using the food menu service.
   *
   * @return {Promise<Food[]>} A promise that resolves to an array of menu items.
   */
  @Get()
  async getMenuItems(): Promise<Food[]> {
    return this.foodMenuService.getMenuItems();
  }
}
