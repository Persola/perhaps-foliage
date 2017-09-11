// @flow
import type { editorState } from './types/editor-state.js'

export default (candidateEditorState: editorState): boolean => {
  if (!Object.keys(candidateEditorState) === ['stageful']) {
    return false;
  }

  const { stageful } = candidateEditorState;

  if (!Object.keys(stageful) === ['klass', 'data']) {
    return false;
  }

  if (!stageful.klass === 'numberLiteral') {
    return false;
  }

  if (![0, 1].includes(stageful.data)) {
    return false;
  }

  return true;
};
