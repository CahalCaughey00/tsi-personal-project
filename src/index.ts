import { main2 } from "./presentation-layer/presentation"
import { dbORM } from "./data-layer/AddonDB"


const main = async () => {

  await dbORM.init()
  await main2()

}

main().then(() => {
  console.log("Done")
})