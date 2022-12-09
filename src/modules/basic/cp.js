import { createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";
import { join, basename } from "path";
import { pipeline } from "stream/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";

export const cp = async (currentPath, ...params) => {
  const [pathToFile, pathToNewDirectory] = params;
  if (!pathToFile || !pathToNewDirectory || params.length > 2)
    throw DEFAULT_ERRORS.invalidInput();
  const pathToFileN = normalizePath(currentPath, pathToFile);
  const pathToNewDirectoryN = normalizePath(currentPath, pathToNewDirectory);

  try {
    await access(pathToFileN);
    const readableStream = createReadStream(pathToFileN);
    const writableStream = createWriteStream(
      join(pathToNewDirectoryN, basename(pathToFileN)),
      { flags: "wx" }
    );
    await pipeline(readableStream, writableStream);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
