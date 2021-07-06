// @flow
import type { EditorState } from '../../types/editor-state.js';

export default (
  oldState: EditorState,
): EditorState => {
  if (oldState.interpreting !== false) {
    throw new Error('attempted to interpret while already interpreting');
  }

  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    interpreting: true,
  };
};
