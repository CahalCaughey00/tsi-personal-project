import { AddonDB } from "../data-layer/AddonDB.js";
import { Addon } from "../data-layer/entities/Addon.entity.js";
import { File } from "../data-layer/entities/File.entity.js";

const database = new AddonDB();
await database.init();

export const viewAllAddons = async () => {
  const result = await database.getAll(File);
  console.log(result);
};

export const viewAddon = (id: string) => {};

export const importAddon = (id: string) => {};

export const deleteAddon = (id: string) => {};

export const viewAllFiles = (id: string) => {};

export const viewFile = (id: string) => {};

export const importFile = (id: string) => {};

export const deleteFile = (id: string) => {};
