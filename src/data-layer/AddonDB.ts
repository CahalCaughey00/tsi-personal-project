import { SqliteDriver } from "@mikro-orm/sqlite";
import { IncomingAddon } from "../incoming-entities/incomingAddon";
import { IncomingFile } from "../incoming-entities/incomingFile";
import { initOrm } from "./initOrm";
import { addonMapper } from "./mappers/addonMapper";
import { fileMapper } from "./mappers/fileMapper";

export class AddonDB {
  public orm;
  public entityManager;

  constructor() {}

  public async init() {
    this.orm = await initOrm();
    await this.orm.connect()
    this.entityManager = this.orm.em.fork();
    await this.orm.close();
  }

  public async getById(table: any, id: string) {
    await this.orm.connect();

    let result;
    try {
      result = await this.entityManager.findOne(table, {
        entityId: Number(id),
      });
    } catch (error) {
      console.log(error);
      return undefined
    }

    await this.orm.close();
    return result;
  }

  public async getAll(table) {
    await this.orm.connect();
    const result = await this.entityManager.find(table, {});
    await this.orm.close();
    return result;
  }

  public async removeById(table: any, id: string) {
    const itemToRemove = await this.getById(table, id);
    if(itemToRemove){
      await this.orm.connect();
      this.entityManager.remove(itemToRemove);
      await this.entityManager.flush();
      await this.orm.close();
      return itemToRemove;
    } else {
      return undefined
    }
  }

  public async writeEntity(type: any, file: any) {
    if (file.fileName) {
      const mappedEntity = fileMapper(file as IncomingFile);
      const isExisting = await this.getById(type, file.id);
      await this.orm.connect();
      if (!isExisting) {
        this.entityManager.persist(mappedEntity);
      } else if (isExisting) {
        console.log("Entity already exists with this id. Replace with new...");
        this.entityManager.assign(mappedEntity, isExisting);
      }
    } else if (file.webSiteURL) {
      const mappedEntity = addonMapper(file as IncomingAddon);
      const isExisting = await this.getById(type, file.addonID);
      await this.orm.connect();
      if (!isExisting) {
        this.entityManager.persist(mappedEntity);
      } else if (isExisting) {
        console.log("Entity already exists with this id. Replace with new...");
        this.entityManager.assign(mappedEntity, isExisting);
      }
    }
    await this.entityManager.flush();
    await this.orm.close();
  }
}

export const dbORM = new AddonDB();
