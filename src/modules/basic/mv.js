import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";
import { cp } from "./cp.js";
import { rm } from "./rm.js";

export const mv = async (currentPath, ...params) => {
  const [pathToFile, pathToNewDirectory] = params;
  if (!pathToFile || !pathToNewDirectory || params.length > 2)
    throw DEFAULT_ERRORS.invalidInput;
  const pathToFileN = normalizePath(currentPath, pathToFile);
  const pathToNewDirectoryN = normalizePath(currentPath, pathToNewDirectory);

  await cp(currentPath, pathToFileN, pathToNewDirectoryN);
  await rm(currentPath, pathToFileN);
  return { path: currentPath };
};
