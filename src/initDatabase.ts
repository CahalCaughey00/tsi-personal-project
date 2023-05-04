import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { File } from "./data-layer/entities/File.entity";
import * as fs from "fs";
import { join as joinPath } from "path";

console.log("Connectig to db...");

if (fs.existsSync("./addon-db")) {
  fs.unlinkSync("./addon-db");
}

MikroORM.init<SqliteDriver>({
  dbName: "addon-db",
  type: "sqlite",
  entities: [joinPath("src", "data-layer", "entities")],
  entitiesTs: [joinPath("src", "data-layer", "entities")],
}).then(async (orm) => {
  console.log((await orm.isConnected()) ? "Connected" : "Not Connected");
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();

  console.log("Populating database...");

  const em = orm.em.fork();

  const addons = JSON.parse(
    fs.readFileSync(joinPath("allMods.json"), "utf-8")
  ).installedAddons;

  addons.forEach((addon) => {
    const entity: File = new File();

    for (const field in addon.installedFile) {
      entity["entityId"] = addon.installedFile.id;
      entity["Hashes"] = addon.installedFile.Hashes;
      entity["addonId"] = addon.installedFile.projectId;
      entity["alternateFileId"] = addon.installedFile.alternateFileId;
      entity["dependencies"] = addon.installedFile.dependencies;
      entity["downloadUrl"] = addon.installedFile.downloadUrl;
      entity["fileDate"] = addon.installedFile.fileDate;
      entity["fileLength"] = addon.installedFile.fileLength;
      entity["fileName"] = addon.installedFile.fileName;
      entity["gameVersion"] = addon.installedFile.gameVersion;
      entity["hasInstallScript"] = addon.installedFile.hasInstallScript;
      entity["isAlternate"] = addon.installedFile.isAlternate;
      entity["isAvailable"] = addon.installedFile.isAvailable;
    }

    em.persist(entity);
  });
  await em.flush();
  await orm.close();
});
