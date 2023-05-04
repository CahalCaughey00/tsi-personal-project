import { main2 } from "./presentation-layer/presentation"
import { AddonDB } from "./data-layer/AddonDB"
import { Addon } from "./data-layer/entities/Addon.entity"
import { dbORM } from "./data-layer/AddonDB"


const main = async () => {

  await dbORM.init()
  await main2()

}

main().then(() => {
  console.log("Done")
})