// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import dupGraphs from './dup-graphs.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'
import type { syntacticGraph } from './types/syntactic-graph.js'
import type { syntacticGraphMap } from './types/syntactic-graph-map'

const defaultStageful: syntacticGraph = codeLoader();
const defaultEditorState = {
  graphs: {'1': defaultStageful, '2': codeLoader()},
  stagedGraphKey: '1',
  resultGraphKey: '2'
};
const naturalReduxStates = ['@@redux/INIT']
const editorstateReducer = (
  originalState: editorState = defaultEditorState,
  action: reduxAction
): editorState => {
  if (action.type === 'INITIALIZE') {
    return originalState;
  } else if (action.type === 'UPDATE_STAGE') {
    const { stageful } = action;
    const newGraphList: syntacticGraphMap = dupGraphs(originalState.graphs);
    newGraphList[originalState.stagedGraphKey] = stageful;

    return Object.assign({}, originalState, {
      graphs: newGraphList
    });
  } else if (action.type === 'UPDATE_RESULT') {
    const { result } = action;
    const newGraphList: syntacticGraphMap = dupGraphs(originalState.graphs);
    newGraphList[originalState.resultGraphKey] = result;

    return Object.assign({}, originalState, {
      graphs: newGraphList
    });
  } else if (naturalReduxStates.includes(action.type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${action.type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
