import type { Focus } from "../../../../types/editor-state/focus";
import type { SynoId } from "../../../../types/syno-id";
export default ((focus: Focus | null | undefined, synoId: SynoId): {
  focused: boolean;
  presnoFocused: number | null | undefined;
  charFocused: number | null | undefined;
} => {
  let focused;
  let presnoFocused;
  let charFocused;

  if (!!focus && synoId === focus.synoId) {
    focused = focus.presnoIndex === null;
    presnoFocused = focus.presnoIndex;
    charFocused = focus.charIndex;
  } else {
    focused = false;
    presnoFocused = null;
    charFocused = null;
  }

  return {
    focused,
    presnoFocused,
    charFocused
  };
});