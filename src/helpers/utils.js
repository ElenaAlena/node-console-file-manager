import { normalize, isAbsolute, resolve } from "path";
import { readLine } from "../index.js";
import { writeGoodbyeMsg } from "./infoLines.js";

export const getUserName = (params) => {
  if (params.length) {
    const listParams = params[0].split("=");
    if (listParams[0] === "--username" && listParams[1].length)
      return listParams[1];
  }
  return "Guest";
};

export const exit = (username) => {
  writeGoodbyeMsg(username);
  readLine.close();
};

export const normalizePath = (currentPath, newPath) => {
  const normalizePath = normalize(newPath);
  return isAbsolute(normalizePath)
    ? normalizePath
    : resolve(currentPath, newPath);
};
