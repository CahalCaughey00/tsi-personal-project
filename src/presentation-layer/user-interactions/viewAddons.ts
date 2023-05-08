import { viewAllAddons, viewAddon } from "../../application-layer/application";

export const viewAddons = async (context) => {
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
  const addon = await viewAddon(choice.Addons, context);
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
