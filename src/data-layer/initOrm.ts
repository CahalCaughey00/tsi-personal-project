import { MikroORM } from "@mikro-orm/core"
import { join } from "path"

export const initOrm = async () => {
  return await MikroORM.init({
    dbName: "addon-db",
    type: "sqlite",
    entities: [join("dist", "data-layer", "entities")],
    entitiesTs: [join("src", "data-layer", "entities")]
  }, false)
}
