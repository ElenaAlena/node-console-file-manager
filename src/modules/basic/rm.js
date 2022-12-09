import { rm as remove } from "fs/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";

export const rm = async (currentPath, ...params) => {
  const [pathToFile] = params;
  if (!pathToFile || params.length > 1) throw DEFAULT_ERRORS.invalidInput;
  const pathToFileN = normalizePath(currentPath, pathToFile);

  try {
    await remove(pathToFileN);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
