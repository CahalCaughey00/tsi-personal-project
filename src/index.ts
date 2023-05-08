import { presentation } from "./presentation-layer/presentation"
import { dbORM } from "./data-layer/AddonDB"


const main = async () => {

  await dbORM.init()
  await presentation()

}

main()