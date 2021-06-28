// @flow
import interpreter from './interpreter.js';
import createSynoFetcher from '../../../syntree-utils/create-syno-fetcher.js';
import ascendToRoot from '../../../syntree-utils/ascend-to-root.js';
import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution';
import type { ReduxStore } from '../../../types/redux-store';
import type { EditorState } from '../../../types/editor-state';

export default (editorStateStore: ReduxStore) => () => {
  const editorState: EditorState = editorStateStore.getState();

  editorStateStore.dispatch({ type: 'START_INTERPRETATION' });

  try {
    const getSyno = createSynoFetcher(editorState.synoMap);
    const rootOfFocused = ascendToRoot(editorState.focus.synoId, getSyno);
    const resolution: InterpretationResolution = interpreter(rootOfFocused, [], getSyno);
    if (resolution.success) {
      editorStateStore.dispatch({
        type: 'END_INTERPRETATION',
        result: resolution.result,
      });
    } else {
      throw new Error(`interpretation failed: "${resolution.error.message}"`);
    }
  } catch (error) {
    if (error.message === 'syntactic graph is incomplete') {
      console.warn(`Interpretation failed with message: "${error.message}"`); // eslint-disable-line no-console
    } else {
      throw error;
    }
  }
};
