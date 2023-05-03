import { Enum, MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { File } from "./data-layer/entities/File.entity";
import * as fs from "fs"
import { join as joinPath } from "path"

console.log("Connectig to db...")

MikroORM.init<SqliteDriver>({
  dbName: "addon-db",
  type: "sqlite",
  entities: [joinPath("src","data-layer","entities")],
  entitiesTs: [joinPath("src","data-layer","entities")]
}).then(async (orm) => {

  const em = orm.em.fork()

  console.log(await em.find(File, {}))
  await orm.close()
});
