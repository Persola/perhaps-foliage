// @flow
import type { EditorState } from '../../types/editor-state.js';

export default (
  oldState: EditorState,
): EditorState => {
  return {
    ...oldState,
    loadingSyntree: true,
  };
};
