import path from "path";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";

export const up = (currentPath, ...params) => {
  if (params.length !== 0) {
    throw DEFAULT_ERRORS.invalidInput;
  }

  return { path: path.join(currentPath, "..") };
};
