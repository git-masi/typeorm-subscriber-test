import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserSubscriber } from "./entity/UserSubscriber";
import { appConfig } from "./app";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: appConfig.SYNC_SCHEMA,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [UserSubscriber],
});
