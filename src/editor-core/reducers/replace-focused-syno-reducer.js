// @flow
import synoMapReducer from './replace-focused-syno/syno-map';

import type { EditorState } from '../../types/editor-state.js';
import type { ReplaceFocusedSyno } from '../../types/actions/replace-focused-syno';

export default (
  oldState: EditorState,
  action: ReplaceFocusedSyno,
): EditorState => {
  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    synoMap: synoMapReducer(oldState.synoMap, action),
    focus: {
      synoId: action.newSynoId,
      presnoIndex: false,
      charIndex: false,
    },
    resultOutdated: true,
  };
};
