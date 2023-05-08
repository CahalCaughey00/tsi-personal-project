import { importAddon } from "../../application-layer/application";
import fs from "fs";

export const choiceImportAddon = async (context) => {
  let choice;
  const inquirer = (await import("inquirer")).default;

  try {
    console.log(context.LOG_LEV)
    const choices = fs.readdirSync("import-directory");
    choice = await inquirer.prompt([
      { name: "fileToRead", choices: choices, type: "rawlist", message: "" },
    ]);
    const importedAddon = await importAddon(choice["fileToRead"], context);
    console.log("File imported successfully: \n");
    console.log(importedAddon);
  } catch (error) {
    context.logError(context.LOG_LEV, error)
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
