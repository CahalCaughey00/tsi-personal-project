// export const allAddonsMock = []
import { DBAddon } from "../../src/data-layer/interfaces/Addon"
import { DBModFile } from "../../src/data-layer/interfaces/File"

export const allFilesMock: DBModFile[] = [
  {
    entityId: 4143801,
    fileName: 'iris-mc1.19.2-1.4.5.jar',
    fileDate: '2022-12-07T21:28:33.257Z',
    fileLength: 2632361,
    downloadUrl: 'https://edge.forgecdn.net/files/4143/801/iris-mc1.19.2-1.4.5.jar',
    isAlternate: false,
    alternateFileId: 0,
    dependencies: [ '[object Object]' ],
    isAvailable: true,
    gameVersion: [ 'Fabric', '1.19.2', 'Quilt' ],
    hasInstallScript: false,
    addonId: 455508,
    Hashes: []
  },
  {
    entityId: 4151762,
    fileName: 'lithium-fabric-mc1.19.2-0.10.4.jar',
    fileDate: '2022-12-08T21:54:53.15Z',
    fileLength: 555137,
    downloadUrl: 'https://edge.forgecdn.net/files/4151/762/lithium-fabric-mc1.19.2-0.10.4.jar',
    isAlternate: false,
    alternateFileId: 0,
    dependencies: [ '[object Object]', '[object Object]' ],
    isAvailable: true,
    gameVersion: [ 'Fabric', 'Client', '1.19.2', 'Server' ],
    hasInstallScript: false,
    addonId: 360438,
    Hashes: []
  }
]

export const allAddonsMock: DBAddon[] = [
  {
    "entityId": 372124,
    "gameId": 432,
    "name": "Phosphor (Fabric)",
    "authors": [{ "Name": "jellysquid3_" }],
    "primaryAuthor": "jellysquid3_",
    "primaryCategoryId": 425,
    "webSiteUrl": "https://www.curseforge.com/minecraft/mc-mods/phosphor",
    "thumbnailUrl": "https://media.forgecdn.net/avatars/thumbnails/284/775/256/256/637298471783289760.png",
    "tags": [],
    "installedFile": 3832074,
    "latestFile": 3832074
  },
  {
    "entityId": 455508,
    "gameId": 432,
    "name": "Iris Shaders",
    "authors": [{ "Name": "coderbot" }, { "Name": "IMS21" }],
    "primaryAuthor": "coderbot",
    "primaryCategoryId": 425,
    "webSiteUrl": "https://www.curseforge.com/minecraft/mc-mods/irisshaders",
    "thumbnailUrl": "https://media.forgecdn.net/avatars/thumbnails/640/757/256/256/638042285668346158.jpeg",
    "tags": [],
    "installedFile": 4143801,
    "latestFile": 4143801
  }]