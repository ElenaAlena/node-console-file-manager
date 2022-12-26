import { rename } from "fs/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";

export const rn = async (currentPath, ...params) => {
  const [oldFileName, newFileName] = params;
  if (!oldFileName || !newFileName || params.length > 2)
    throw DEFAULT_ERRORS.invalidInput;
  const oldFilePath = normalizePath(currentPath, oldFileName);
  const newFilePath = normalizePath(currentPath, newFileName);

  try {
    await rename(oldFilePath, newFilePath);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
