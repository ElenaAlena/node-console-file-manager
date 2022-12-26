import { access } from "fs/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";
export const cd = async (currentPath, ...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) throw DEFAULT_ERRORS.invalidInput;
  try {
    const newPath = normalizePath(currentPath, receivedPath);
    await access(newPath);
    return { path: newPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
