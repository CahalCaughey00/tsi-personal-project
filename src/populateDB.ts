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
  console.log("Populating database...")
  const em = orm.em.fork() 


  const entity: File = new File()
  const srcFile: File = JSON.parse(fs.readFileSync(joinPath("example-file.json"), "utf-8"))

  entity.Hashes = srcFile.Hashes
  entity.addonId = srcFile.addonId
  entity.alternateFileId = srcFile.alternateFileId
  entity.dependencies = srcFile.dependencies
  entity.downloadUrl = srcFile.downloadUrl
  entity.fileDate = srcFile.fileDate
  entity.fileLength = srcFile.fileLength
  entity.fileName = srcFile.fileName
  entity.gameVersion = srcFile.gameVersion
  entity.hasInstallScript = srcFile.hasInstallScript
  entity.id = srcFile.id
  entity.isAlternate = srcFile.isAlternate
  entity.isAvailable = srcFile.isAvailable


  const entities = await em.persistAndFlush(entity);
  console.log(entities)

  await orm.close()
});