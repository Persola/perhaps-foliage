// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';

import createState from '../selectors/create-state-selector';
import deriveInverseReferenceMap from './derive-inverse-reference-map';
import codeLoader from '../code-loader/code-loader';

import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer';
import endInterpretationReducer from './reducers/end-interpretation-reducer';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer';
import navigateReducer from './reducers/navigate-reducer';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer';
import startInterpretationReducer from './reducers/start-interpretation-reducer';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer';
import charBackspaceReducer from './reducers/char-backspace-reducer';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer';
import verifyActionType from './reducers/util/verify-action-type';

import interpretEpic from './epics/interpret';
import loadSyntreeEpic from './epics/load-syntree';

import type { LanguageIntegration } from '../types/language-integration';
import type { StateSelector } from '../types/state-selector';
import type { ReduxStore } from '../types/redux-store';
import type { ReduxAction } from '../types/redux-action';
import type { EditorState } from '../types/editor-state';
import type { MutableEditorState } from '../types/mutable-editor-state';
import type { SynoMap } from '../types/syno-map';

const salivaPrimitives: SynoMap = codeLoader.loadSyntreeFromFileSystem('salivaPrimitives');
const testSyntree: SynoMap = codeLoader.loadSyntreeFromFileSystem('proxyNorCall');
// const testSyntree: SynoMap = codeLoader('pantheon');

type CreateStoreReturn = {
  editorStateStore: ReduxStore,
  stateSelector: StateSelector,
};

export default (integration: LanguageIntegration): CreateStoreReturn => {
  const defaultEditorState: EditorState = {
    grammar: integration.grammar,
    // grammar: pantheonGrammar,
    grammarName: 'saliva',
    // grammarName: 'pantheon',
    primitives: salivaPrimitives,
    synoMap: testSyntree,
    resultTree: {},
    inverseReferenceMap: deriveInverseReferenceMap(testSyntree, '1-1'),
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

  const stateSelector: StateSelector = createState(defaultEditorState);

  const editorStateReducer = (
    oldState: EditorState = defaultEditorState,
    action: ReduxAction,
  ): EditorState => {
    return produce(oldState, untypedDraftState => {
      const draftState = ((untypedDraftState: any): MutableEditorState);

      switch (action.type) {
        case 'REPLACE_FOCUSED_SYNO': {
          replaceFocusedSynoReducer(
            stateSelector,
            action,
            draftState,
            integration.keyToNewSynoAttrs,
          );
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
          charBackspaceReducer(stateSelector, draftState);
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
    interpretEpic(action$, state$, stateSelector, integration),
    loadSyntreeEpic(action$, state$),
  );

  epicMiddleware.run(rootEpic);

  return {
    editorStateStore,
    stateSelector,
  };
};
