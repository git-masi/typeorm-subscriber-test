import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
} from "typeorm";
import { User } from "./User";
import { appConfig } from "../app";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    console.log(`New user event, app ID: ${appConfig.APP_ID}`, event.entity);
  }
}
