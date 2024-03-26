import { Module } from '@nestjs/common';
import { FoodMenuService } from './food-menu.service';
import { FoodMenuController } from './food-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodMenuService],
  controllers: [FoodMenuController],
})
export class FoodMenuModule {}
