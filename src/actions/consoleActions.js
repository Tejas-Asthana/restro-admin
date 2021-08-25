import { CONSOLE_LOG } from "./types";

export function HelloWorld(data) {
  return {
    type: CONSOLE_LOG,
    payload: {
      data,
    },
  };
}
