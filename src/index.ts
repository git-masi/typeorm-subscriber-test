import { initApp, appConfig } from "./app";
import { AppDataSource } from "./data-source";

(async function main() {
  try {
    const dataSource = await AppDataSource.initialize();

    const app = initApp(dataSource);

    app.listen(appConfig.PORT, () => {
      console.info(`server listening on port ${appConfig.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
