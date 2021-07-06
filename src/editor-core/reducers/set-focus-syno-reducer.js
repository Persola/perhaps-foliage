// @flow
import type { EditorState } from '../../types/editor-state.js';
import type { SetFocusSyno } from '../../types/actions/set-focus-syno';

export default (
  oldState: EditorState,
  action: SetFocusSyno,
): EditorState => {
  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    focus: {
      synoId: action.synoId,
      presnoIndex: false,
      charIndex: false,
    },
  };
};
