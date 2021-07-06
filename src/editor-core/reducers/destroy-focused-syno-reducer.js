// @flow
import synoMapReducer from './destroy-focused-syno/syno-map';
import focusReducer from './destroy-focused-syno/focus';

import type { EditorState } from '../../types/editor-state.js';
import type { DestroyFocusedSyno } from '../../types/actions/destroy-focused-syno';

export default (
  oldState: EditorState,
  action: DestroyFocusedSyno,
): EditorState => {
  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    synoMap: synoMapReducer(
      oldState.synoMap,
      action,
      oldState.inverseReferenceMap,
    ),
    focus: focusReducer(
      oldState.focus,
      action,
      oldState.synoMap,
    ),
  };
};
