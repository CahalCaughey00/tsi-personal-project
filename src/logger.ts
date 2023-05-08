export enum LOG_LEVEL{
  NONE = 0,
  LIGHT = 1,
  VERBOSE = 2
}

export const logError = (LOG_LEV, error) => {
  switch (LOG_LEV.valueOf()) {
    case LOG_LEVEL.LIGHT:
      console.log(error.message);
      break;
    case LOG_LEVEL.VERBOSE:
      console.log(error);
      break;
    default:
      console.log("Something went horribly wrong!");
      break;
  }
}