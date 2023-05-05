import { dbORM } from "../data-layer/AddonDB";
import { Addon } from "../data-layer/entities/Addon.entity";
import { File } from "../data-layer/entities/File.entity";
import fs from "fs"
import { IncomingFile } from "../incoming-entities/incomingFile";

export const viewAllAddons = async () => {
  const result = await dbORM.getAll(Addon);
  return result
};

export const viewAddon = async (id: string) => {
  const result = await dbORM.getById(Addon, id);
  return result
};

export const importAddon = async (filePath: string) => {
  const fileObj = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  const newAddon = await dbORM.writeEntity(Addon, fileObj)
  return newAddon
};

export const deleteAddon = async (id: string) => {
  const removedItem = await dbORM.removeById(Addon, id)
  return removedItem
};

export const viewAllFiles = async () => {
  const result = await dbORM.getAll(File);
  return result
};

export const viewFile = async (id: string) => {
  const result = await dbORM.getById(File, id);
  return result
};

export const importFile = async (filePath: string) => {
  const fileObj = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  const newFile = await dbORM.writeEntity(File, fileObj)
  return newFile
};

export const deleteFile = async (id: string) => {
  const removedItem = await dbORM.removeById(File, id)
  return removedItem
};
