// @flow
import { createStore } from 'redux';

import deriveInverseReferenceMap from './derive-inverse-reference-map.js';
import codeLoader from '../code-loader/code-loader.js';
import verifyActionType from './reducers/util/verify-action-type';

import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer.js';
import endInterpretationReducer from './reducers/end-interpretation-reducer.js';
import navigateReducer from './reducers/navigate-reducer.js';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer.js';
import startInterpretationReducer from './reducers/start-interpretation-reducer.js';
import charBackspaceReducer from './reducers/char-backspace-reducer.js';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer.js';

import type { ReduxStore } from '../types/redux-store.js';
import type { ReduxAction } from '../types/redux-action.js';
import type { EditorState } from '../types/editor-state.js';
import type { SynoMap } from '../types/syno-map.js';

import salivaGrammar from '../extension-staging-area/saliva/grammar.yml';
import salivaTextHostRefs from '../extension-staging-area/saliva/textHostRefs.yml';
// import pantheonGrammar from '../extension-staging-area/pantheon/grammar.yml';
// import pantheonTextHostRefs from '../extension-staging-area/pantheon/textHostRefs.yml';

const primitiveGraphs: SynoMap = codeLoader('salivaPrimitives');
const seedGraphs: SynoMap = codeLoader('proxyNorCall');
// const seedGraphs: SynoMap = codeLoader('pantheon');
const defaultSynoMap = { ...seedGraphs, ...primitiveGraphs };
const defaultEditorState: EditorState = {
  grammar: salivaGrammar,
  // grammar: pantheonGrammar,
  grammarName: 'saliva',
  // grammarName: 'pantheon',
  textHostRefs: salivaTextHostRefs,
  // textHostRefs: pantheonTextHostRefs,
  synoMap: defaultSynoMap,
  inverseReferenceMap: deriveInverseReferenceMap(defaultSynoMap),
  focus: {
    synoId: Object.keys(seedGraphs)[0],
    presnoIndex: false,
    charIndex: false,
    // synoId: 'cronus',
    // presnoIndex: false,
    // charIndex: false,
  },
  resultSyntreeRootId: false,
  interpreting: false,
  resultOutdated: false,
};

const editorStateReducer = (
  oldState: EditorState = defaultEditorState,
  action: ReduxAction,
): EditorState => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      return replaceFocusedSynoReducer(oldState, action);
    }
    case 'END_INTERPRETATION': {
      return endInterpretationReducer(oldState, action);
    }
    case 'NAVIGATE': {
      return navigateReducer(oldState, action);
    }
    case 'SET_FOCUS_SYNO': {
      return setFocusSynoReducer(oldState, action);
    }
    case 'START_INTERPRETATION': {
      return startInterpretationReducer(oldState);
    }
    case 'CHAR_BACKSPACE': {
      return charBackspaceReducer(oldState, action);
    }
    case 'DESTROY_FOCUSED_SYNO': {
      return destroyFocusedSynoReducer(oldState, action);
    }
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
};

const editorStateStore = createStore(
  editorStateReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default (editorStateStore: ReduxStore);
