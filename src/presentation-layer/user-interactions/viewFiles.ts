import { viewAllFiles, viewFile } from "../../application-layer/application";

export const viewFiles = async (context) => {
  const inquirer = (await import("inquirer")).default;

  const allFiles = await viewAllFiles();
  let choice = await inquirer.prompt([
    {
      name: "Files",
      choices: allFiles,
      type: "rawlist",
      message: "",
    },
  ]);
  const file = await viewFile(choice.Files, context);
  console.log()
  console.log(file);
  console.log()

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