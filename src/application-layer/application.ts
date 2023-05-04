import { AddonDB, dbORM } from "../data-layer/AddonDB";
import { Addon } from "../data-layer/entities/Addon.entity";
import { File } from "../data-layer/entities/File.entity";

export const viewAllAddons = async () => {};

export const viewAddon = (id: string) => {};

export const importAddon = (id: string) => {};

export const deleteAddon = (id: string) => {};

export const viewAllFiles = async () => {
  const result = await dbORM.getAll(File);
  return result
};

export const viewFile = (id: string) => {};

export const importFile = (id: string) => {};

export const deleteFile = (id: string) => {};
