import { presentation } from "./presentation-layer/presentation";
import { dbORM } from "./data-layer/AddonDB";
import { LOG_LEVEL } from "./logger";

export const LOG_LEV: LOG_LEVEL = LOG_LEVEL.LIGHT;

const main = async () => {
  switch (LOG_LEV.valueOf()) {
    case LOG_LEVEL.LIGHT:
      console.log("Running in DEBUG MODE: LIGHT\n");
      break;
    case LOG_LEVEL.VERBOSE:
      console.log("Running in DEBUG MODE: VERBOSE\n");
      break;
    default:
      break;
  }

  await dbORM.init();
  await presentation();
};

main();
