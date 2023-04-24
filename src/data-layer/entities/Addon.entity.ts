import { Entity, Property, PrimaryKey, OneToOne } from "@mikro-orm/core"
import { File } from "./File.entity"

@Entity()
export class Addon {

  @PrimaryKey()
  addonId: number

  @Property()
  gameId: number

  @Property()
  name: string

  @Property()
  authors: object[]

  @Property()
  primaryAuthor: string

  @Property()
  primaryCategoryId: number

  @Property()
  webSiteUrl: string

  @Property()
  thumbnailUrl: string

  @Property()
  tags: []

  @Property()
  installedFile: File

  @Property()
  status: number

  @Property()
  intalledTargets: []

  @Property()
  laststFile: File

}