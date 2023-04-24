import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Addon } from "./Addon.entity"

@Entity()
export class File {

  @PrimaryKey()
  id!: number

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
  dependencies: object[]

  @Property()
  isAvailable: boolean

  @Property()
  gameVersion: string[]

  @Property()
  hasInstallScript: boolean

  @ManyToOne({
    entity: () => Addon,
    wrappedReference: true
  })
  addonId: number

  @Property()
  Hashes: []

}
