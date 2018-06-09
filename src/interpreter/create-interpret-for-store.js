// @flow
import interpreter from './interpreter.js'
import type { reduxStore } from '../types/redux-store'

export default (editorStateStore: reduxStore) => {
  return () => {
    const editorState = editorStateStore.getState();
    let result;
    try {
      const stageful = editorState.graphs[editorState.stagedGraphIndex]
      result = interpreter(stageful);
    }
    catch (error) {
      if (error.message === 'syntactic graph is incomplete') {
        console.warn(`Interpretation failed with message: "${error.message}"`) // eslint-disable-line no-console
        result = false;
      } else {
        throw error;
      }
    }
    editorStateStore.dispatch({
      type: 'UPDATE_RESULT',
      result
    });
  };
}
