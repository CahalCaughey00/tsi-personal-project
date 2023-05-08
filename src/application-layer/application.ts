import { dbORM } from "../data-layer/AddonDB";
import { Addon } from "../data-layer/entities/Addon.entity";
import { File } from "../data-layer/entities/File.entity";
import fs from "fs"
import path from "path"

export let allAddons: any[] = []
export const viewAllAddons = async (): Promise<any[]> => {
  allAddons = await dbORM.getAll(Addon);
  const allIds = allAddons.map(obj => obj.entityId)
  return allIds
};

export const viewAddon = async (id: string, context) => {
  const result = await dbORM.getById(Addon, id, context);
  return result
};

export const importAddon = async (file: string, context) => {
  const fileObj = JSON.parse(fs.readFileSync(path.join("import-directory", file), "utf-8"))
  const newAddon = await dbORM.writeEntity(Addon, fileObj, context)
  return newAddon
};

export const deleteAddon = async (id: string, context) => {
  const removedItem = await dbORM.removeById(Addon, id, context)
  return removedItem
};

export const viewAllFiles = async () => {
  const result = await dbORM.getAll(File);
  const allIds = result.map(obj => obj.entityId)
  return allIds
};

export const viewFile = async (id: string, context) => {
  const result = await dbORM.getById(File, id, context);
  return result
};

export const importFile = async (file: string, context) => {
  const fileObj = JSON.parse(fs.readFileSync(path.join("import-directory", file), "utf-8"))
  const newFile = await dbORM.writeEntity(File, fileObj, context)
  return newFile
};

export const deleteFile = async (id: string, context) => {
  const removedItem = await dbORM.removeById(File, id, context)
  return removedItem
};
