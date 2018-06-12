// @flow
import interpreter from './interpreter.js'
import type { interpretationResolution } from '../types/interpreter/interpretation-resolution'
import type { reduxStore } from '../types/redux-store'
import type { editorState } from '../types/editor-state' // eslint-disable-line no-unused-vars

export default (editorStateStore: reduxStore) => {
  return () => {
    const editorState: editorState = editorStateStore.getState();
    try {
      const stageful = editorState.graphs[editorState.stagedGraphKey];
      const resolution: interpretationResolution = interpreter(stageful, editorState.graphs, {});
      if (resolution.success) {
        editorStateStore.dispatch({
          type: 'UPDATE_RESULT',
          result: resolution.result
        });
      } else {
        throw new Error(`interpretation failed: "${resolution.error.message}"`);
      }
    }
    catch (error) {
      if (error.message === 'syntactic graph is incomplete') {
        console.warn(`Interpretation failed with message: "${error.message}"`) // eslint-disable-line no-console
      } else {
        throw error;
      }
    }
  };
}
