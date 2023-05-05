import { IncomingAddon } from "../../incoming-entities/incomingAddon";
import { Addon } from "../entities/Addon.entity";

export const addonMapper = (file: IncomingAddon) => {
  const entity = new Addon()

  entity.entityId = file.addonID
  entity.authors = file.authors
  entity.gameId = file.gameID
  entity.installedFile = file.installedFile.id
  entity.intalledTargets = file.installedTargets
  entity.latestFile = file.latestFile.id
  entity.name = file.name
  entity.primaryAuthor = file.primaryAuthor
  entity.primaryCategoryId = file.primaryCategoryId
  entity.status = file.status
  entity.tags = file.tags
  entity.thumbnailUrl = file.thumbnailUrl
  entity.webSiteUrl = file.webSiteURL

  return entity
}