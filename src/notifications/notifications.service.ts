import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FoodMenuEvents } from 'src/enums/enums';
import { NewMealEvent } from 'src/events/new-meal.event';

@Injectable()
export class NotificationsService {
  @OnEvent(FoodMenuEvents.newmeal)
  /**
   * Notify the user about a new meal event.
   *
   * @param {NewMealEvent} payload - the payload containing information about the new meal event
   * @return {Promise<void>}
   */
  async notifyUser(payload: NewMealEvent) {
    console.log(
      `Hello, user, ${payload.name} has been added to our meny. Enjoy`,
    );
  }
}
