import { Entity, Property, PrimaryKey, OneToOne } from "@mikro-orm/core";
import { DBAddon } from "../interfaces/Addon"
import { File } from "./File.entity.js";

@Entity()
export class Addon implements DBAddon{

  @PrimaryKey()
  entityId: number;

  @Property()
  gameId: number;

  @Property()
  name: string;

  @Property()
  authors: { Name: string }[];

  @Property()
  primaryAuthor: string;

  @Property()
  primaryCategoryId: number;

  @Property()
  webSiteUrl: string;

  @Property()
  thumbnailUrl: string;

  @Property()
  tags: any[];

  @Property()
  installedFile: number;

  @Property()
  status: number;

  @Property()
  installedTargets: any[];

  @Property()
  latestFile: number;
}
