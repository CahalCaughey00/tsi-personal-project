import { viewAllFiles, deleteFile } from "../../application-layer/application";

export const choiceDeleteFile = async () => {
  const inquirer = (await import("inquirer")).default;

  const allFiles = await viewAllFiles();
  let choice = await inquirer.prompt([
    {
      name: "Files",
      choices: allFiles,
      type: "list",
      message: "",
    },
  ]);
  const file = await deleteFile(choice.Files);
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