// @flow
import { createStore } from 'redux';
import codeLoader from '../code-loader/code-loader.js'

import graphsReducer from './reducers/syno-map.js'
import focusedSynoIdReducer from './reducers/focused-syno-id.js'
import resultSyntreeRootIdReducer from './reducers/result-syntree-root-id.js'
import resultOutdatedReducer from './reducers/result-outdated.js'

import type { ReduxAction } from '../types/redux-action.js'
import type { EditorState } from '../types/editor-state.js'
import type { SynoMap } from '../types/syno-map.js'

const primitiveGraphs: SynoMap = codeLoader('primitives');
const seedGraphs: SynoMap = codeLoader('proxyNorCall');
const defaultEditorState: EditorState = {
  synoMap: Object.assign({}, seedGraphs, primitiveGraphs),
  focusedSynoId: Object.keys(seedGraphs)[0],
  resultSyntreeRootId: false,
  resultOutdated: false
};
const editorstateReducer = (
  originalState: EditorState = defaultEditorState,
  action: ReduxAction
): EditorState => {
  return {
    synoMap: graphsReducer(originalState.synoMap, action),
    focusedSynoId: focusedSynoIdReducer(originalState.focusedSynoId, action, originalState.synoMap),
    resultSyntreeRootId: resultSyntreeRootIdReducer(originalState.resultSyntreeRootId, action),
    resultOutdated: resultOutdatedReducer(originalState.resultOutdated, action)
  }
}

export default createStore(
  editorstateReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
