// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import dupDrafts from './dup-drafts.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'
import type { syntacticGraph } from './types/syntactic-graph.js'

const defaultStageful: syntacticGraph = codeLoader();
const defaultEditorstate = {
  drafts: [defaultStageful],
  stagedDraftIndex: 1,
  result: false
};
const naturalReduxStates = ['@@redux/INIT']
const editorstateReducer = (
  originalState: editorState = defaultEditorstate,
  action: reduxAction
): editorState => {
  const { type } = action;

  if (type === 'INITIALIZE') {
    return originalState;
  } else if (type === 'UPDATE') {
    const { stageful } = action;
    const newDraftList: syntacticGraph[] = dupDrafts(originalState.drafts);
    newDraftList[originalState.stagedDraftIndex] = stageful;

    return Object.assign({}, originalState, {
      drafts: newDraftList
    });
  } else if (type === 'UPDATE_RESULT') {
    const { result } = action;

    return Object.assign({}, originalState, {
      result
    })
  } else if (naturalReduxStates.includes(type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
