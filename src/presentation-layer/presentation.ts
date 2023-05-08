import { LOG_LEV } from "../index";
import {
  viewAddons,
  choiceImportAddon,
  choiceDeleteAddon,
  viewFiles,
  choiceImportFile,
  choiceDeleteFile,
} from "./user-interactions";
import { LOG_LEVEL } from "../logger";

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
    new inquirer.Separator(),
    "Quit",
    new inquirer.Separator(),
  ];
  const menu = {
    name: "AddonDB",
    choices: options,
    type: "rawlist",
    message: "",
  };

  let result;
  while (true) {
    const response = await inquirer.prompt([menu]);
    switch (response["AddonDB"]) {
      case "View Addons":
        result = await viewAddons();
        if (!result) {
          return;
        } else {
          break;
        }
      case "Import an Addon":
        result = await choiceImportAddon();
        if (!result) {
          return;
        } else {
          break;
        }
      case "Delete an Addon":
        result = await choiceDeleteAddon();
        if (!result) {
          return;
        } else {
          break;
        }
      case "View Files":
        result = await viewFiles();
        if (!result) {
          return;
        } else {
          break;
        }
      case "Import a File":
        result = await choiceImportFile();
        if (!result) {
          return;
        } else {
          break;
        }
      case "Delete a File":
        result = await choiceDeleteFile();
        if (!result) {
          return;
        } else {
          break;
        }
      case "Quit":
        return;
      default:
        console.log("Something went horribly wrong!");
        break;
    }
  }
};
