import { importFile } from "../../application-layer/application";
import fs from "fs";

export const choiceImportFile = async () => {
  const inquirer = (await import("inquirer")).default;
  const choices = fs.readdirSync("import-directory");
  console.log(choices);
  let choice = await inquirer.prompt([
    { name: "fileToRead", choices: choices, type: "list", message: "" },
  ]);

  try {
    const allFiles = await importFile(choice["fileToRead"]);
    console.log("File imported successfully");
  } catch (error) {
    console.log("Something went horribly wrong!");
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
