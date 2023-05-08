import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { File } from "./data-layer/entities/File.entity";
import * as fs from "fs";
import { join as joinPath } from "path";
import { IncomingAddon } from "./incoming-entities/incomingAddon";
import { Addon } from "./data-layer/entities/Addon.entity";

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
    fs.readFileSync(joinPath("example-files", "allMods.json"), "utf-8")
  ).installedAddons;

  addons.forEach((addon: IncomingAddon) => {

    const entity: File = new File();

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

    em.persist(entity);
  });
  await em.flush();


  addons.forEach((addon: IncomingAddon) => {

    const entity: Addon = new Addon();
    
    entity.entityId = addon.addonID
    entity.authors = addon.authors
    entity.gameId = addon.gameID
    entity.installedFile = addon.installedFile.id
    entity.installedTargets = addon.installedTargets
    entity.latestFile = addon.latestFile.id
    entity.name = addon.name
    entity.primaryAuthor = addon.primaryAuthor
    entity.primaryCategoryId = addon.primaryCategoryId
    entity.status = addon.status
    entity.tags = addon.tags
    entity.thumbnailUrl = addon.thumbnailUrl
    entity.webSiteUrl = addon.webSiteURL

    em.persist(entity);
  });
  await em.flush();
  await orm.close();
});
