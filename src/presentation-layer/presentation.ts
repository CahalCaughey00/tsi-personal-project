import readline from "readline";
import * as app from "../application-layer/application"

export const main2 = async () => {
  // console.log(await app.viewAllFiles())
  // console.log("--------------------------------")
  // console.log(await app.viewAllAddons())
  // console.log("--------------------------------")
  // console.log(await app.viewFile("100000"))
  // console.log("--------------------------------")
  // console.log(await app.viewAddon("455508"))
  // console.log("--------------------------------")
  // console.log("--------------------------------")
  // console.log("--------------------------------")
  // console.log("--------------------------------")
  await app.importFile("file.json")
  await app.importAddon("addon.json")
  console.log(await app.viewAddon("1010101010"))
  console.log(await app.viewFile("100000"))
  // console.log(await app.viewAllFiles())
  await app.deleteAddon("1010101010")
  await app.deleteFile("100000")
  // console.log(await app.viewAddon("1010101010"))
  // console.log(await app.viewFile("100000"))
  console.log(await app.viewAllAddons())
  console.log(await app.viewAllFiles())
  console.log("--------------------------------")
}

const main = async () => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  
  let exit = false;
  while (!exit) {
    console.log("Select an option: \n--------------");
    console.log("1. View an addon");
    console.log("2. Import an addon");
    console.log("3. Delete an addon");
    console.log("4. Exit AddonDB");
    await new Promise<void>((resolve, reject) => {
      prompt.question("THINGNIGN", (response) => {
        switch (response) {
          case "1":
            console.log("Enter an addon to view");
            resolve()
          case "2":
            console.log("Choose an addon to view");
            resolve()
          case "3":
            console.log("Enter an addon to delete");
            resolve()
          case "3":
            console.log("Exiting AddonDB...");
            exit = true;
            resolve()
        }
      });
    })
  }
};