// @flow
import { createStore } from 'redux';
import codeLoader from '../code-loader/code-loader.js'

import graphsReducer from './reducers/graphs.js'
import stagedNodeIdReducer from './reducers/staged-node-id.js'
import resultNodeIdReducer from './reducers/result-node-id.js'
import resultOutdatedReducer from './reducers/result-outdated.js'

import type { ReduxAction } from '../types/redux-action.js'
import type { EditorState } from '../types/editor-state.js'
import type { SynoMap } from '../types/editor-state/syno-map.js'

const primitiveGraphs: SynoMap = codeLoader('primitives');
const seedGraphs: SynoMap = codeLoader('proxyNorCall');
const defaultEditorState: EditorState = {
  graphs: Object.assign({}, seedGraphs, primitiveGraphs),
  stagedNodeId: Object.keys(seedGraphs)[0],
  resultNodeId: false,
  resultOutdated: false
};
const editorstateReducer = (
  originalState: EditorState = defaultEditorState,
  action: ReduxAction
): EditorState => {
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
