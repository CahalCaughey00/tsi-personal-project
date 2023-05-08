export const changeDebugLevel = async () => {
  const inquirer = (await import("inquirer")).default;

  const choice1 = await inquirer.prompt([
    {
      name: "Debug Mode",
      choices: ["NONE", "LIGHT", "VERBOSE"],
      type: "rawlist",
      message: "",
    },
  ]);
  const choice2 = await inquirer.prompt([
    {
      name: "Continue?",
      choices: ["Yes", "No"],
      type: "list",
      message: "",
    },
  ]);

  if (choice2["Continue?"] == "Yes") {
    console.log(`Running in DEBUG MODE: ${choice1["Debug Mode"]}`)
    return choice1["Debug Mode"]
  } else {
    return false;
  }
};