import { Injectable } from '@nestjs/common';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NewMealEvent } from 'src/events/new-meal.event';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodMenuEvents } from 'src/enums/enums';

@Injectable()
export class FoodMenuService {
  /**
   * Constructor for the class.
   *
   * @param {Food} foodRepo - the food repository
   * @param {EventEmitter2} eventEmitter - the event emitter
   */
  constructor(
    @InjectRepository(Food) private readonly foodRepo: Repository<Food>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create a new menu item with the given name and price.
   *
   * @param {string} name - The name of the menu item
   * @param {number} price - The price of the menu item
   * @return {Food} The newly created menu item
   */
  async createMenuItem(name: string, price: number) {
    const food = this.foodRepo.create({ name, price });
    await this.foodRepo.save(food);

    this.eventEmitter.emit(FoodMenuEvents.newmeal, new NewMealEvent(food.name));

    return food;
  }

  /**
   * Retrieves the menu items from the food repository.
   *
   * @return {Promise<Food[]>} A promise that resolves to an array of food items.
   */
  async getMenuItems() {
    return await this.foodRepo.find();
  }
}
