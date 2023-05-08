import { importAddon } from "../../application-layer/application";
import fs from "fs";
import { logError } from "../../logger";

export const choiceImportAddon = async () => {
  let choice;
  const inquirer = (await import("inquirer")).default;

  try {
    const choices = fs.readdirSync("import-directory");
    choice = await inquirer.prompt([
      { name: "fileToRead", choices: choices, type: "rawlist", message: "" },
    ]);
    const importedAddon = await importAddon(choice["fileToRead"]);
    console.log("File imported successfully: \n");
    console.log(importedAddon);
  } catch (error) {
    logError(error)
  }

  choice = await inquirer.prompt([
    {
      name: "Continue?",
      choices: ["Yes", "No"],
      type: "list",
      message: "",
    },
  ]);

  if (choice["Continue?"] == "Yes") {
    return true;
  } else {
    return false;
  }
};
