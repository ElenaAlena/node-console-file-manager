import { createReadStream } from "fs";
import { Writable } from "stream";
import { pipeline } from "stream/promises";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";
import { normalizePath } from "../../helpers/utils.js";

export const cat = async (currentPath, ...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) throw DEFAULT_ERRORS.invalidInput;
  const pathToFile = normalizePath(currentPath, receivedPath);
  const customWritable = new Writable();
  customWritable._write = (chunk, _, done) => {
    console.log(chunk.toString());
    done();
  };
  try {
    await pipeline(createReadStream(pathToFile), customWritable);
    return { path: currentPath };
  } catch {
    throw DEFAULT_ERRORS.operationFailed;
  }
};
