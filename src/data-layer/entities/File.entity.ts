import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class File {

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
  dependencies: object[]

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

  printThing(){
    for (const field in this){
      console.log(`${field}: ${this[field]}`)
    }
  }

}
