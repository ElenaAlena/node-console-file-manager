import { EOL, cpus, userInfo, arch } from "os";
import { DEFAULT_ERRORS } from "../../helpers/constants.js";

export const os = async (currentPath, ...params) => {
  const [flag] = params;
  if (!flag || params.length > 1) throw DEFAULT_ERRORS.invalidInput;

  switch (flag) {
    case "--EOL": {
      console.log(JSON.stringify(EOL));
      break;
    }
    case "--cpus": {
      console.log(
        cpus().map(
          (cpu, index) =>
            `${index + 1}: ${cpu.model}, speed: ${cpu.speed / 1000} GHz`
        )
      );
      break;
    }
    case "--homedir": {
      console.log(userInfo().homedir);
      break;
    }
    case "--username": {
      console.log(JSON.stringify(userInfo().username));
      break;
    }
    case "--architecture": {
      console.log(JSON.stringify(arch()));
      break;
    }
    default: {
      throw DEFAULT_ERRORS.invalidInput;
    }
  }
  return { path: currentPath };
};
