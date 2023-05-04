import { AddonDB, dbORM } from "../data-layer/AddonDB";
import { Addon } from "../data-layer/entities/Addon.entity";
import { File } from "../data-layer/entities/File.entity";

export const viewAllAddons = async () => {
  const result = await dbORM.getAll(Addon);
  return result
};

export const viewAddon = async (id: string) => {
  const result = await dbORM.getById(Addon, id);
  return result
};

export const importAddon = (id: string) => {};

export const deleteAddon = (id: string) => {};

export const viewAllFiles = async () => {
  const result = await dbORM.getAll(File);
  return result
};

export const viewFile = async (id: string) => {
  const result = await dbORM.getById(File, id);
  return result
};

export const importFile = (id: string) => {};

export const deleteFile = (id: string) => {};
