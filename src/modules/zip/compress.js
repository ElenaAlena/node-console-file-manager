import { createReadStream, createWriteStream } from "fs";
import { resolve, parse } from "path";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";

export const compress = async (currentPath, ...params) => {
  const [pathToFile, pathToDestination] = params;
  if (!pathToFile || !pathToDestination || params.length > 2)
    throw DEFAULT_ERRORS.invalidInput;

  const filePath = resolve(currentPath, pathToFile);
  const archivedFilePath = resolve(
    currentPath,
    pathToDestination,
    `${parse(pathToFile).base}.br`
  );
  const zip = createBrotliCompress();
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(archivedFilePath);
  try {
    await pipeline(readStream, zip, writeStream);
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }

  return { path: currentPath };
};
