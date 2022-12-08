import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import os from "os";
import { writeCurrentPath, writeHelloMsg } from "./helpers/infoLines.js";
import { exit, getUserName } from "./helpers/utils.js";
import { callCommand } from "./modules/command.js";

export const readLine = readline.createInterface({ input, output });

const username = getUserName(process.argv.slice(2));
let currentPath = os.homedir();

writeHelloMsg(username);

writeCurrentPath(currentPath);

readLine.on("line", (input) => {
  if (input === ".exit") exit(username);
  else {
    callCommand(input, currentPath)
      .then((result) => {
        if (result?.path) {
          currentPath = result?.path;
          writeCurrentPath(currentPath);
        }
      })
      .catch((err) => console.log(err.message));
  }
});

readLine.on("SIGINT", () => {
  exit(username);
});
