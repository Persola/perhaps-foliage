// @flow
import synoMapReducer from './char-backspace/syno-map';

import type { EditorState } from '../../types/editor-state.js';
import type { CharBackspace } from '../../types/actions/char-backspace';

export default (
  oldState: EditorState,
  action: CharBackspace,
): EditorState => {
  if (oldState.focus.charIndex === false) {
    throw new TypeError('CHAR_BACKSPACE action recieved while not focused on text syno');
  }

  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    synoMap: synoMapReducer(
      oldState.synoMap,
      action,
      oldState.textHostRefs,
    ),
    focus: (
      oldState.focus.charIndex === 0
        ? oldState.focus
        : ({ ...oldState.focus, // $FlowIssue: poorly typed ECMA built-in (Object.assign)
          charIndex: oldState.focus.charIndex - 1 })
    ),
  };
};
