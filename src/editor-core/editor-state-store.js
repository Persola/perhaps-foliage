// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';

import deriveInverseReferenceMap from './derive-inverse-reference-map.js';
import codeLoader from '../code-loader/code-loader.js';
import verifyActionType from './reducers/util/verify-action-type';

import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer.js';
import endInterpretationReducer from './reducers/end-interpretation-reducer.js';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer.js';
import navigateReducer from './reducers/navigate-reducer.js';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer.js';
import startInterpretationReducer from './reducers/start-interpretation-reducer.js';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer.js';
import charBackspaceReducer from './reducers/char-backspace-reducer.js';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer.js';

import interpretEpic from './epics/interpret';
import loadSyntreeEpic from './epics/load-syntree';

import type { ReduxStore } from '../types/redux-store.js';
import type { ReduxAction } from '../types/redux-action.js';
import type { EditorState } from '../types/editor-state.js';
import type { SynoMap } from '../types/syno-map.js';

import salivaGrammar from '../extension-staging-area/saliva/grammar.yml';
import salivaTextHostRefs from '../extension-staging-area/saliva/textHostRefs.yml';
// import pantheonGrammar from '../extension-staging-area/pantheon/grammar.yml';
// import pantheonTextHostRefs from '../extension-staging-area/pantheon/textHostRefs.yml';

const salivaPrimitives: SynoMap = codeLoader.loadSyntreeFromFileSystem('salivaPrimitives');
const testSyntree: SynoMap = codeLoader.loadSyntreeFromFileSystem('proxyNorCall');
// const testSyntree: SynoMap = codeLoader('pantheon');
const defaultSynoMap = { ...testSyntree, ...salivaPrimitives };
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
    synoId: Object.keys(testSyntree)[0],
    presnoIndex: false,
    charIndex: false,
    // synoId: 'cronus',
    // presnoIndex: false,
    // charIndex: false,
  },
  resultSyntreeRootId: false,
  interpreting: false,
  resultOutdated: false,
  loadingSyntree: false,
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
    case 'END_SYNTREE_LOAD': {
      return endSyntreeLoadReducer(oldState, action);
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
    case 'START_SYNTREE_LOAD': {
      return startSyntreeLoadReducer(oldState);
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

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const editorStateStore = createStore(
  editorStateReducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware),
  ),
);

const rootEpic = (action$, state$) => merge(
  interpretEpic(action$, state$),
  loadSyntreeEpic(action$, state$),
);

epicMiddleware.run(rootEpic);

export default (editorStateStore: ReduxStore);
