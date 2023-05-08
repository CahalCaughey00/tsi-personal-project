import { importFile } from "../../application-layer/application";
import fs from "fs";
import { logError } from "../../logger";


export const choiceImportFile = async () => {
  const inquirer = (await import("inquirer")).default;
  const choices = fs.readdirSync("import-directory");
  let choice = await inquirer.prompt([
    { name: "fileToRead", choices: choices, type: "rawlist", message: "" },
  ]);

  try {
    const importedFile = await importFile(choice["fileToRead"]);
    console.log("File imported successfully: \n");
    console.log(importedFile);
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
