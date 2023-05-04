export interface DBModFile {
  entityId: number
  fileName: string
  fileDate: string
  fileLength: number;
  downloadUrl: string;
  isAlternate: boolean;
  alternateFileId: number;
  dependencies: { addonId: number; type: number; }[];
  isAvailable: boolean;
  gameVersion: string[];
  hasInstallScript: boolean;
  addonId: number;
  Hashes: any[];
}