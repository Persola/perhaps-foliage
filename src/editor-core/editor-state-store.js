// @flow
import { createStore } from 'redux';
import codeLoader from '../code-loader/code-loader.js'

import graphsReducer from './reducers/graphs.js'
import stagedNodeIdReducer from './reducers/staged-node-id.js'
import resultNodeIdReducer from './reducers/result-node-id.js'
import resultOutdatedReducer from './reducers/result-outdated.js'

import type { reduxAction } from '../types/redux-action.js'
import type { editorState } from '../types/editor-state.js'
import type { synoMap } from '../types/editor-state/syno-map.js'

const primitiveGraphs: synoMap = codeLoader('primitives');
const seedGraphs: synoMap = codeLoader('norDef');
const defaultEditorState: editorState = {
  graphs: Object.assign({}, seedGraphs, primitiveGraphs),
  stagedNodeId: Object.keys(seedGraphs)[0],
  resultNodeId: false,
  resultOutdated: false
};
const editorstateReducer = (
  originalState: editorState = defaultEditorState,
  action: reduxAction
): editorState => {
  return {
    graphs: graphsReducer(originalState.graphs, action),
    stagedNodeId: stagedNodeIdReducer(originalState.stagedNodeId, action),
    resultNodeId: resultNodeIdReducer(originalState.resultNodeId, action),
    resultOutdated: resultOutdatedReducer(originalState.resultOutdated, action)
  }
}

export default createStore(
  editorstateReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
