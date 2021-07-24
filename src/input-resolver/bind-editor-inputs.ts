import * as Mousetrap from "mousetrap";
import createFocusSyno from "./create-focus-syno";
import type { ReduxStore } from "../types/redux-store";
export default (
  editorStateStore: ReduxStore,
  inputResolver: (arg0: string) => void
) => {
  Mousetrap.bind(
    ["enter", "left", "right", "up", "down", "backspace"],
    (e, key) => {
      if (["up", "down", "backspace"].includes(key)) {
        e.preventDefault();
      }

      inputResolver(key);
    }
  );

  if (!document.documentElement) {
    throw new Error("document missing");
  }

  document.documentElement.click(); // bindings don't work before this (focus?)

  document.addEventListener("click", createFocusSyno(editorStateStore));
};
