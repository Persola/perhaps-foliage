// @flow
import { createStore } from 'redux';

import deriveInverseReferenceMap from './derive-inverse-reference-map.js'
import codeLoader from '../code-loader/code-loader.js'

import synoMapReducer from './reducers/syno-map.js'
import inverseReferenceMapReducer from './reducers/inverse-reference-map.js'
import grammarReducer from './reducers/grammar.js'
import grammarNameReducer from './reducers/grammar-name.js'
import textHostRefsReducer from './reducers/text-host-refs.js'
import focusReducer from './reducers/focus.js'
import resultSyntreeRootIdReducer from './reducers/result-syntree-root-id.js'
import resultOutdatedReducer from './reducers/result-outdated.js'
import interpretingReducer from './reducers/interpreting.js'

const salivaGrammar = require('../extension-staging-area/saliva/grammar.yml');
const salivaTextHostRefs = require('../extension-staging-area/saliva/textHostRefs.yml');
const pantheonGrammar = require('../extension-staging-area/pantheon/grammar.yml');
const pantheonTextHostRefs = require('../extension-staging-area/pantheon/textHostRefs.yml');

import type { ReduxAction } from '../types/redux-action.js'
import type { EditorState } from '../types/editor-state.js'
import type { SynoMap } from '../types/syno-map.js'

const primitiveGraphs: SynoMap = codeLoader('salivaPrimitives');
const seedGraphs: SynoMap = codeLoader('proxyNorCall');
// const seedGraphs: SynoMap = codeLoader('pantheon');
const defaultSynoMap = Object.assign({}, seedGraphs, primitiveGraphs);
const defaultEditorState: EditorState = {
  synoMap: defaultSynoMap,
  inverseReferenceMap: deriveInverseReferenceMap(defaultSynoMap),
  grammar: salivaGrammar,
  // grammar: pantheonGrammar,
  grammarName: 'saliva',
  // grammarName: 'pantheon',
  textHostRefs: salivaTextHostRefs,
  // textHostRefs: pantheonTextHostRefs,
  focus: {
    synoId: Object.keys(seedGraphs)[0],
    presnoIndex: false,
    charIndex: false
    // synoId: 'cronus',
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
      originalState.inverseReferenceMap,
      originalState.textHostRefs
    ),
    inverseReferenceMap: inverseReferenceMapReducer(
      originalState.inverseReferenceMap,
      action,
      originalState.synoMap
    ),
    grammar: grammarReducer(
      originalState.grammar,
      action
    ),
    grammarName: grammarNameReducer(
      originalState.grammarName,
      action
    ),
    textHostRefs: textHostRefsReducer(
      originalState.textHostRefs,
      action
    ),
    focus: focusReducer(
      originalState.focus,
      action,
      originalState.synoMap,
      originalState.grammarName
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
