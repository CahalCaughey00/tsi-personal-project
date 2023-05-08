import { viewAllAddons, deleteAddon } from "../../application-layer/application";

export const choiceDeleteAddon = async () => {
  const inquirer = (await import("inquirer")).default;

  const allAddons = await viewAllAddons();
  let choice = await inquirer.prompt([
    {
      name: "Addons",
      choices: allAddons,
      type: "rawlist",
      message: "",
    },
  ]);
  const addon = await deleteAddon(choice.Addons);
  console.log()
  console.log(addon);
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