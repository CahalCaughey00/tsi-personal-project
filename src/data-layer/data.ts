import { Connection, EntityManager, EntityName, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { SqlEntityManager, SqliteDriver } from "@mikro-orm/sqlite";
// import { Addon, File } from "./entities";
import { Addon } from "../data-layer/entities/Addon.entity.js";
import { File } from "../data-layer/entities/File.entity.js";
import * as fs from "fs";
import { join as joinPath } from "path";

export class AddonDB {
  private orm: MikroORM<SqliteDriver>;
  private entityManager: SqlEntityManager<SqliteDriver> & EntityManager<IDatabaseDriver<Connection>>
  public entities;
  private ormConfig

  constructor() {
    this.ormConfig = {
      dbName: "addon-db",
      type: "sqlite",
      entities: [joinPath("dist", "data-layer", "entities")],
      entitiesTs: [joinPath("src", "data-layer", "entities")],
    }
  }

  public async init() {
    this.orm = await MikroORM.init<SqliteDriver>(this.ormConfig);
    this.entityManager =  this.orm.em.fork()
    await this.orm.close()
  }

  public async getById(table: EntityName<Addon | File>, id: string){
    await this.orm.connect()
    const result = await this.entityManager.findOne(table, {entityId : Number(id)})
    await this.orm.close()
    return result
  }

  public async getAll(table){
    await this.orm.connect()
    const result = await this.entityManager.find(table, {})
    await this.orm.close()
    return result
  }

  public getEntityManager(){
    return this.entityManager
  }

  public async close(){
    await this.orm.close()
  }


}
