import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { File } from "./data-layer/entities/File.entity";
import * as fs from "fs"
import { join as joinPath } from "path"

console.log("Connectig to db...")

MikroORM.init<SqliteDriver>({
  dbName: "addon-db",
  type: "sqlite",
  entities: ["./src/data-layer/entities"],
  entitiesTs: ['./src/data-layer/entities']
}).then(async (orm) => {
  console.log(await orm.isConnected() ? "Connected" : "Not Connected")
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up()

  await orm.close()
});
