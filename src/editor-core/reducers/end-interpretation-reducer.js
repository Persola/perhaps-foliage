// @flow
import synoMapReducer from './end-interpretation/syno-map';

import type { EditorState } from '../../types/editor-state.js';
import type { EndInterpretation } from '../../types/actions/end-interpretation';

export default (
  oldState: EditorState,
  action: EndInterpretation,
): EditorState => {
  if (oldState.interpreting !== true) {
    throw new Error('attempted to stop interpreting while not interpreting');
  }

  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    synoMap: synoMapReducer(oldState.synoMap, action),
    resultSyntreeRootId: action.result.id,
    interpreting: false,
    resultOutdated: false,
  };
};
