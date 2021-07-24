import type { CharBackspace } from "../../types/actions/char-backspace";
export default (key: string): CharBackspace | null | undefined => {
  if (key === "backspace") {
    return {
      type: "CHAR_BACKSPACE",
    };
  }

  return null;
};
