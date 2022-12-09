import { writeFile } from 'fs/promises';
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from '../../helpers/utils.js';

export const add = async (currentPath, ...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) throw DEFAULT_ERRORS.invalidInput;
  const pathToFile = normalizePath(currentPath, receivedPath);

  try {
    await writeFile(pathToFile, '', { flag: "wx" });
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
