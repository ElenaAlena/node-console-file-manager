import { readLine } from "../index.js";
import { writeGoodbyeMsg } from "./infoLines.js";

export const getUserName = (params) => {
  const listParams = params[0].split("=");
  if (listParams[0] === "--username" && listParams[1].length)
    return listParams[1];
  throw new Error("Username is incorrect(e.g. --username=your_username)");
};

export const exit = (username) => {
    writeGoodbyeMsg(username)
    readLine.close();
  };
