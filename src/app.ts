import express from "express";
import bodyParser from "body-parser";
import { type DataSource } from "typeorm";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { User } from "./entity/User";

export const appConfig = yargs(hideBin(process.argv))
  .option("PORT", {
    alias: "p",
    type: "number",
    description: "A port for the server to listen on",
    demandOption: true,
    coerce(arg) {
      return Number(arg);
    },
  })
  .option("APP_ID", {
    alias: "i",
    type: "number",
    description: "A unique ID for the server",
    demandOption: true,
    coerce(arg) {
      return Number(arg);
    },
  })
  .option("SYNC_SCHEMA", {
    alias: "s",
    type: "boolean",
    description:
      "Indicates if database schema should be auto created on every application launch",
    default: true,
  })
  .check((argv) => {
    if (!Number.isInteger(argv.PORT) || !Number.isInteger(argv.APP_ID)) {
      throw new Error("Both PORT and ID must be numbers");
    }
    return true;
  })
  .parseSync();

export function initApp(dataSource: DataSource) {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.post("/users", async (req, res) => {
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(User);
      const { id } = await repo.save(req.body);
      res.send({ userId: id });
    });
  });

  return app;
}
