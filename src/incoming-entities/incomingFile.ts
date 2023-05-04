export interface IncomingFile {
  id: number;
  fileName: string;
  fileDate: string;
  fileLength: number;
  releaseType: number;
  fileStatus: number;
  downloadUrl: string;
  isAlternate: boolean;
  alternateFileId: number;
  dependencies: {
    addonId: number;
    type: number;
  }[];
  isAvailable: boolean;
  modules: {
    foldername: string;
    fingerprint: number;
    invalidFingerprint: boolean;
  }[];
  packageFingerprint: number;
  gameVersion: string[];
  sortableGameVersion: {
    gameVersion: string;
    gameVersionName: string;
    gameVersionTypeId: number;
  }[];
  hasInstallScript: boolean;
  isCompatibleWithClient: boolean;
  restrictProjectFileAccess: number;
  projectStatus: number;
  projectId: number;
  FileNameOnDisk: string;
  Hashes: any[];
}
