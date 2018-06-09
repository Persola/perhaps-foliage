// @flow
import interpreter from './interpreter.js'
import type { reduxStore } from '../types/redux-store'
import type { editorState } from '../types/editor-state'

export default (editorStateStore: reduxStore) => {
  return () => {
    const editorState:editorState = editorStateStore.getState();
    try {
      const stageful = editorState.graphs[editorState.stagedGraphKey]
      const result = interpreter(stageful);
      editorStateStore.dispatch({
        type: 'UPDATE_RESULT',
        result
      });
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
