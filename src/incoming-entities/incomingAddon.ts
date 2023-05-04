import { IncomingFile } from "./incomingFile";

export interface IncomingAddon {
  instanceID: string;
    modSource: number;
    addonID: number;
    gameID: number;
    gameInstanceID: string;
    name: string;
    authors: {
        Name: string;
    }[];
    primaryAuthor: string;
    primaryCategoryId: number;
    packageType: number;
    webSiteURL: string;
    thumbnailUrl: string;
    tags: any[];
    installedFile: IncomingFile,
    dateInstalled: string;
    dateUpdated: string;
    dateLastUpdateAttempted: string;
    status: number;
    installSource: number;
    preferenceReleaseType: any;
    preferenceAutoInstallUpdates: boolean;
    preferenceAlternateFile: boolean;
    preferenceIsIgnored: boolean;
    isModified: boolean;
    isWorkingCopy: boolean;
    isFuzzyMatch: boolean;
    manifestName: any;
    installedTargets: any[];
    latestFile: IncomingFile
}