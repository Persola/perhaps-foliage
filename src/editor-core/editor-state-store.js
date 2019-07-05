// @flow
import { createStore } from 'redux';

import deriveInverseReferenceMap from './derive-inverse-reference-map.js'
import codeLoader from '../code-loader/code-loader.js'

import synoMapReducer from './reducers/syno-map.js'
import inverseReferenceMapReducer from './reducers/inverse-reference-map.js'
import focusReducer from './reducers/focus.js'
import resultSyntreeRootIdReducer from './reducers/result-syntree-root-id.js'
import resultOutdatedReducer from './reducers/result-outdated.js'
import interpretingReducer from './reducers/interpreting.js'

import type { ReduxAction } from '../types/redux-action.js'
import type { EditorState } from '../types/editor-state.js'
import type { SynoMap } from '../types/syno-map.js'

const primitiveGraphs: SynoMap = codeLoader('primitives');
const seedGraphs: SynoMap = codeLoader('proxyNorCall');
const defaultSynoMap = Object.assign({}, seedGraphs, primitiveGraphs);
const defaultEditorState: EditorState = {
  synoMap: defaultSynoMap,
  inverseReferenceMap: deriveInverseReferenceMap(defaultSynoMap),
  focus: {
    synoId: '1-4',
    presnoIndex: false,
    charIndex: false
    // synoId: Object.keys(seedGraphs)[0],
    // presnoIndex: false,
    // charIndex: false
  },
  resultSyntreeRootId: false,
  resultOutdated: false,
  interpreting: false
};
const editorstateReducer = (
  originalState: EditorState = defaultEditorState,
  action: ReduxAction
): EditorState => {
  return {
    synoMap: synoMapReducer(
      originalState.synoMap,
      action,
      originalState.inverseReferenceMap
    ),
    inverseReferenceMap: inverseReferenceMapReducer(
      originalState.inverseReferenceMap,
      action,
      originalState.synoMap
    ),
    focus: focusReducer(
      originalState.focus,
      action,
      originalState.synoMap
    ),
    resultSyntreeRootId: resultSyntreeRootIdReducer(
      originalState.resultSyntreeRootId,
      action
    ),
    resultOutdated: resultOutdatedReducer(
      originalState.resultOutdated,
      action
    ),
    interpreting: interpretingReducer(
      originalState.interpreting,
      action
    )
  }
}

export default createStore(
  editorstateReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
