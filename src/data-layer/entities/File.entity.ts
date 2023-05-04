import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { DBModFile } from "../interfaces/File"

@Entity()
export class File implements DBModFile {

  @PrimaryKey()
  entityId!: number

  @Property()
  fileName!: string

  @Property()
  fileDate: string

  @Property()
  fileLength: number

  @Property()
  downloadUrl: string

  @Property()
  isAlternate: boolean

  @Property()
  alternateFileId: number

  @Property()
  dependencies: string[]

  @Property()
  isAvailable: boolean

  @Property()
  gameVersion: string[]

  @Property()
  hasInstallScript: boolean

  @Property()
  addonId: number

  @Property()
  Hashes: []

}
