import { IncomingFile } from "../../incoming-entities/incomingFile";
import { File } from "../entities/File.entity";

export const fileMapper = (file: IncomingFile) => {
  const entity = new File()

  entity["entityId"] = file.id;
  entity["Hashes"] = file.Hashes;
  entity["addonId"] = file.projectId;
  entity["alternateFileId"] = file.alternateFileId;
  entity["dependencies"] = file.dependencies;
  entity["downloadUrl"] = file.downloadUrl;
  entity["fileDate"] = file.fileDate;
  entity["fileLength"] = file.fileLength;
  entity["fileName"] = file.fileName;
  entity["gameVersion"] = file.gameVersion;
  entity["hasInstallScript"] = file.hasInstallScript;
  entity["isAlternate"] = file.isAlternate;
  entity["isAvailable"] = file.isAvailable;

  return entity
}