import {
  Connection,
  EntityManager,
  EntityName,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
import { SqlEntityManager, SqliteDriver } from "@mikro-orm/sqlite";
import { Addon } from "./entities/Addon.entity";
import { File } from "./entities/File.entity";
import { join as joinPath } from "path";
import { IncomingAddon } from "../incoming-entities/incomingAddon";
import { IncomingFile } from "../incoming-entities/incomingFile";
import { addonMapper } from "./mappers/addonMapper"
import { fileMapper } from "./mappers/fileMapper"


export class AddonDB {
  private orm: MikroORM<SqliteDriver>;
  private entityManager: SqlEntityManager<SqliteDriver> &
    EntityManager<IDatabaseDriver<Connection>>;
  public entities;
  private ormConfig;

  constructor() {
    this.ormConfig = {
      dbName: "addon-db",
      type: "sqlite",
      entities: [joinPath("dist", "data-layer", "entities")],
      entitiesTs: [joinPath("src", "data-layer", "entities")],
    };
  }

  public async init() {
    this.orm = await MikroORM.init<SqliteDriver>(this.ormConfig);
    this.entityManager = this.orm.em.fork();
    await this.orm.close();
  }

  public async getById(table: EntityName<Addon | File>, id: string) {
    await this.orm.connect();
    const result = await this.entityManager.findOne(table, {
      entityId: Number(id),
    });
    await this.orm.close();
    return result;
  }

  public async getAll(table) {
    await this.orm.connect();
    const result = await this.entityManager.find(table, {});
    await this.orm.close();
    return result;
  }

  public async removeById(table: EntityName<Addon | File>, id: string){
    const itemToRemove = await this.getById(table, id)
    await this.orm.connect();
    this.entityManager.remove(itemToRemove);
    await this.entityManager.flush()
    await this.orm.close();
    return itemToRemove
  }

  public async writeEntity(type: EntityName<Addon | File>, file: any){
    if (file.fileName){
      const mappedEntity = fileMapper(file as IncomingFile)
      const isExisting = await this.getById(File, file.id)
      await this.orm.connect()
      if (!isExisting){
        this.entityManager.persist(mappedEntity)
      } else if (isExisting){
        console.log("Entity already exists with this id. Replace with new...")
        this.entityManager.assign(mappedEntity, isExisting)
      }
    } else if (file.webSiteURL){
      const mappedEntity = addonMapper(file as IncomingAddon)
      const isExisting = await this.getById(Addon, file.addonID)
      await this.orm.connect()
      if (!isExisting){
        this.entityManager.persist(mappedEntity)
      } else if (isExisting){
        console.log("Entity already exists with this id. Replace with new...")
        this.entityManager.assign(mappedEntity, isExisting)
      }
    }
    await this.entityManager.flush()
    await this.orm.close();
  }

  public getEntityManager() {
    return this.entityManager;
  }

}

export const dbORM = new AddonDB()
