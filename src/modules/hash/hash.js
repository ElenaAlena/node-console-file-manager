import { readFile } from "fs/promises";
import { createHash } from "crypto";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";

export const hash = async (currentPath, ...params) => {
  const [pathToFile] = params;
  if (!pathToFile || params.length > 1) throw DEFAULT_ERRORS.invalidInput;
  try {
    const filePath = normalizePath(currentPath, pathToFile);
    const data = await readFile(filePath);
    const result = createHash("sha256").update(data).digest("hex");
    console.log(result);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
