// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';

import createState from '../selectors/create-state';
import salivaSelectors from '../extension-staging-area/saliva/selectors/selectors';
import deriveInverseReferenceMap from './derive-inverse-reference-map.js';
import codeLoader from '../code-loader/code-loader.js';

import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer.js';
import endInterpretationReducer from './reducers/end-interpretation-reducer.js';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer.js';
import navigateReducer from './reducers/navigate-reducer.js';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer.js';
import startInterpretationReducer from './reducers/start-interpretation-reducer.js';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer.js';
import charBackspaceReducer from './reducers/char-backspace-reducer.js';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer.js';
import verifyActionType from './reducers/util/verify-action-type';

import interpretEpic from './epics/interpret';
import loadSyntreeEpic from './epics/load-syntree';

import type { StateSelector } from '../types/state-selector';
import type { ReduxStore } from '../types/redux-store.js';
import type { ReduxAction } from '../types/redux-action.js';
import type { EditorState } from '../types/editor-state.js';
import type { MutableEditorState } from '../types/mutable-editor-state.js';
import type { SynoMap } from '../types/syno-map.js';

import salivaGrammar from '../extension-staging-area/saliva/grammar.yml';
import salivaTextHostRefs from '../extension-staging-area/saliva/textHostRefs.yml';
// import pantheonGrammar from '../extension-staging-area/pantheon/grammar.yml';
// import pantheonTextHostRefs from '../extension-staging-area/pantheon/textHostRefs.yml';

const salivaPrimitives: SynoMap = codeLoader.loadSyntreeFromFileSystem('salivaPrimitives');
const testSyntree: SynoMap = codeLoader.loadSyntreeFromFileSystem('proxyNorCall');
// const testSyntree: SynoMap = codeLoader('pantheon');
const defaultSynoMap = { ...testSyntree, ...salivaPrimitives };

type CreateStoreReturn = {
  editorStateStore: ReduxStore,
  stateSelector: StateSelector,
};

export default (): CreateStoreReturn => {
  const defaultEditorState: EditorState = {
    grammar: salivaGrammar,
    // grammar: pantheonGrammar,
    grammarName: 'saliva',
    // grammarName: 'pantheon',
    textHostRefs: salivaTextHostRefs,
    // textHostRefs: pantheonTextHostRefs,
    synoMap: defaultSynoMap,
    inverseReferenceMap: deriveInverseReferenceMap(defaultSynoMap, '1-1'),
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

  const stateSelector: StateSelector = createState(defaultEditorState, salivaSelectors);

  const editorStateReducer = (
    oldState: EditorState = defaultEditorState,
    action: ReduxAction,
  ): EditorState => {
    return produce(oldState, untypedDraftState => {
      const draftState = ((untypedDraftState: any): MutableEditorState);

      switch (action.type) {
        case 'REPLACE_FOCUSED_SYNO': {
          replaceFocusedSynoReducer(stateSelector, action, draftState);
          break;
        }
        case 'END_INTERPRETATION': {
          endInterpretationReducer(stateSelector, action, draftState);
          break;
        }
        case 'END_SYNTREE_LOAD': {
          endSyntreeLoadReducer(stateSelector, action, draftState);
          break;
        }
        case 'NAVIGATE': {
          navigateReducer(stateSelector, action, draftState);
          break;
        }
        case 'SET_FOCUS_SYNO': {
          setFocusSynoReducer(stateSelector, action, draftState);
          break;
        }
        case 'START_INTERPRETATION': {
          startInterpretationReducer(stateSelector, draftState);
          break;
        }
        case 'START_SYNTREE_LOAD': {
          startSyntreeLoadReducer(stateSelector, draftState);
          break;
        }
        case 'CHAR_BACKSPACE': {
          charBackspaceReducer(stateSelector, action, draftState);
          break;
        }
        case 'DESTROY_FOCUSED_SYNO': {
          destroyFocusedSynoReducer(stateSelector, action, draftState);
          break;
        }
        default: {
          verifyActionType(action.type);
          break;
        }
      }
    });
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
    interpretEpic(action$, state$, stateSelector),
    loadSyntreeEpic(action$, state$),
  );

  epicMiddleware.run(rootEpic);

  return {
    editorStateStore,
    stateSelector,
  };
};
