import { importFile } from "../../application-layer/application";
import fs from "fs";


export const choiceImportFile = async (context) => {
  const inquirer = (await import("inquirer")).default;
  const choices = fs.readdirSync("import-directory");
  let choice = await inquirer.prompt([
    { name: "fileToRead", choices: choices, type: "rawlist", message: "" },
  ]);

  try {
    const importedFile = await importFile(choice["fileToRead"], context);
    console.log("File imported successfully: \n");
    console.log(importedFile);
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
