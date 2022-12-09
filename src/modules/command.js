import { add } from "./basic/add.js";
import { cat } from "./basic/cat.js";
import { cp } from "./basic/cp.js";
import { mv } from "./basic/mv.js";
import { rm } from "./basic/rm.js";
import { rn } from "./basic/rn.js";
import { hash } from "./hash/hash.js";
import { os } from "./os/os.js";
import { cd } from "./nwd/cd.js";
import { ls } from "./nwd/ls.js";
import { up } from "./nwd/up.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";

const METHODS_LIST = {
  cd,
  up,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os,
  hash,
  compress,
  decompress,
};

export const callCommand = async (path, input) => {
    
  const params = input.trim().split(/\s+/g);
  const command = params.shift();
  if (!METHODS_LIST[command]) throw new Error("Invalid input");
  return await METHODS_LIST[command](path, ...params);
};
