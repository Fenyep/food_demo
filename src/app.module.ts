import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food-menu/entities/food.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FoodMenuModule } from './food-menu/food-menu.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: `food_repo`,
      username: `user`,
      password: `user`,
      entities: [Food],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    FoodMenuModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
