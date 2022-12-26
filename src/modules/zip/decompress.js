import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";

export const decompress = async (currentPath, ...params) => {
  const [pathToFile, pathToDestination] = params;
  if (!pathToFile || !pathToDestination || params.length > 2)
    throw DEFAULT_ERRORS.invalidInput;

  const filePath = resolve(currentPath, pathToFile);
  const archivedFilePath = resolve(
    currentPath,
    pathToDestination,
    basename(filePath, ".br")
  );
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(archivedFilePath, { flags: "wx" });
  const unzip = createBrotliDecompress();
  try {
    await pipeline(readStream, unzip, writeStream);
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }

  return { path: currentPath };
};
