import { Entity, Property, PrimaryKey, OneToOne } from "@mikro-orm/core";
import { File } from "./File.entity.js";

@Entity()
export class Addon {

  @PrimaryKey()
  entityId: number;

  @Property()
  gameId: number;

  @Property()
  name: string;

  @Property()
  authors: object[];

  @Property()
  primaryAuthor: string;

  @Property()
  primaryCategoryId: number;

  @Property()
  webSiteUrl: string;

  @Property()
  thumbnailUrl: string;

  @Property()
  tags: [];

  @Property()
  installedFileId: string;

  @Property()
  status: number;

  @Property()
  intalledTargets: [];

  @Property()
  latestFileId: string;
}
