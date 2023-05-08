export enum LOG_LEVEL{
  NONE = "NONE",
  LIGHT = "LIGHT",
  VERBOSE = "VERBOSE"
}

export const logError = (LOG_LEV, error) => {
  switch (LOG_LEV) {
    case "LIGHT":
      console.log(error.message);
      break;
    case "VERBOSE":
      console.log(error);
      break;
    default:
      console.log("Something went horribly wrong!");
      break;
  }
}