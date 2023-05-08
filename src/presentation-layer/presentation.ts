import { viewAddons, choiceImportAddon, choiceDeleteAddon } from "./user-interactions";



export const presentation = async () => {
  const inquirer = (await import("inquirer")).default;

  const options = [
    "View Addons",
    "Import an Addon",
    "Delete an Addon",
    new inquirer.Separator(),
    "View Files",
    "Import a File",
    "Delete a File",
  ];
  const menu = {
    name: "AddonDB",
    choices: options,
    type: "list",
    message: "",
  };

  let result
  while (true){
    const response = await inquirer.prompt([menu]);
    switch (response["AddonDB"]) {
      case "View Addons":
        result = await viewAddons();
        console.log(result)
        if (!result) {
          return
        } else {
          break
        }
      case "Import an Addon":
        result = await choiceImportAddon();
        console.log(result)
        if (!result) {
          return
        } else {
          break
        }
      case "Delete an Addon":
        result = await choiceDeleteAddon();
        console.log(result)
        if (!result) {
          return
        } else {
          break
        }
      case "View Files":
        // await
        break;
      case "Import a File":
        // await
        break;
      case "Delete a File":
        // await
        break;
    }
  }
};
