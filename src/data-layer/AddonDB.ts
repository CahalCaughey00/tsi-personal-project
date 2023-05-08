import { SqliteDriver } from "@mikro-orm/sqlite";
import { IncomingAddon } from "../incoming-entities/incomingAddon";
import { IncomingFile } from "../incoming-entities/incomingFile";
import { logError } from "../logger";
import { initOrm } from "./initOrm";
import { addonMapper } from "./mappers/addonMapper";
import { fileMapper } from "./mappers/fileMapper";

export class AddonDB {
  public orm;
  public entityManager;

  constructor() {}

  public async init() {
    try {
      this.orm = await initOrm();
      await this.orm.connect();
      this.entityManager = this.orm.em.fork();
      await this.orm.close();
    } catch (error) {
      logError(error);
    }
  }

  public async getById(table: any, id: string) {
    try {
      await this.orm.connect();

      let result;

      result = await this.entityManager.findOne(table, {
        entityId: Number(id),
      });
      await this.orm.close();
      return result;
    } catch (error) {
      logError(error);
      return undefined;
    }
  }

  public async getAll(table) {
    await this.orm.connect();
    const result = await this.entityManager.find(table, {});
    await this.orm.close();
    return result;
  }

  public async removeById(table: any, id: string) {
    const itemToRemove = await this.getById(table, id);
    try{
      if (itemToRemove) {
        await this.orm.connect();
        this.entityManager.remove(itemToRemove);
        await this.entityManager.flush();
        await this.orm.close();
        return itemToRemove;
      } else {
        return undefined;
      }
    } catch (error){
      logError(error)
      return undefined
    }

  }

  public async writeEntity(type: any, file: any) {
    try {
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
        await this.entityManager.flush();
        await this.orm.close();
        return mappedEntity;
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
        await this.entityManager.flush();
        await this.orm.close();
        return mappedEntity;
      }
    } catch (error) {
      logError(error)
      return undefined
    }
  }
}

export const dbORM = new AddonDB();
