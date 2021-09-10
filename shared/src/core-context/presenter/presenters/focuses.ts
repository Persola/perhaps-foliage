import type { Focus } from '../../../types/editor-state/focus';
import type { SynoId } from '../../../types/syntactic/syno-id';

export default (
  focus: Focus | null,
  synoId: SynoId,
): {
  focused: boolean;
  presnoFocused: number | null;
  charFocused: number | null;
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
    charFocused,
  };
};
