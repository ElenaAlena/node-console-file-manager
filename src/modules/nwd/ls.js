import { readdir } from "fs/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";

export const ls = async (currentPath, ...params) => {
  if (params.length !== 0) {
    throw DEFAULT_ERRORS.invalidInput;
  }
  try {
    const dirents = await readdir(currentPath, { withFileTypes: true });
    const files = dirents
      .map((dirent) => {
        return {
          name: dirent.name,
          type: dirent.isDirectory() ? "directory" : "file",
        };
      })
      .sort((el1, el2) => {
        const aCheck = el1.type === "directory" ? 1 : 0;
        const bCheck = el2.type === "directory" ? 1 : 0;
        return bCheck - aCheck;
      });
    console.table(files);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
