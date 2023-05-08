import { presentation } from "./presentation-layer/presentation";
import { dbORM } from "./data-layer/AddonDB";
import { logError, LOG_LEVEL } from "./logger";

interface Context {
  LOG_LEV: LOG_LEVEL;
  logError: (LOG_LEV: LOG_LEVEL, error) => void;
}

export const context: Context= {
  LOG_LEV: LOG_LEVEL.LIGHT,
  logError: logError,
};

const main = async (context: Context) => {
  switch (context.LOG_LEV) {
    case LOG_LEVEL.LIGHT:
      console.log("Running in DEBUG MODE: LIGHT\n");
      break;
    case LOG_LEVEL.VERBOSE:
      console.log("Running in DEBUG MODE: VERBOSE\n");
      break;
    default:
      break;
  }

  await dbORM.init(context);
  await presentation(context);
};

main(context);
