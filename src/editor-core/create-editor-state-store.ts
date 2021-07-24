import { createStore, compose, applyMiddleware } from 'redux';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';
import * as React from 'react';
import createState from '../selectors/create-state-selector';
import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer';
import endInterpretationReducer from './reducers/end-interpretation-reducer';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer';
import endIntegrationLoadReducer from './reducers/end-integration-load-reducer';
import navigateReducer from './reducers/navigate-reducer';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer';
import startInterpretationReducer from './reducers/start-interpretation-reducer';
import startIntegrationLoadReducer from './reducers/start-integration-load-reducer';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer';
import charBackspaceReducer from './reducers/char-backspace-reducer';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer';
import verifyActionType from './reducers/util/verify-action-type';
import loadIntegrationEpic from './epics/load-integration';
import loadSyntreeEpic from './epics/load-syntree';
import interpretEpic from './epics/interpret';
import NamePart from '../renderer/components/vis/name-part';
import type { AbsentLanguageIntegration } from '../types/language-integration/absent-language-integration';
import type { StateSelector } from '../types/state-selector';
import type { ReduxStore } from '../types/redux-store';
import type { ReduxAction } from '../types/redux-action';
import type { EditorState } from '../types/editor-state';
import type { EditorStateWithoutIntegration } from '../types/editor-state/editor-state-without-integration';
import type { MutableEditorState } from '../types/mutable-editor-state';
// const testSyntree: SynoMap = codeLoader('pantheon');
type CreateStoreReturn = {
  editorStateStore: ReduxStore;
  stateSelector: StateSelector;
};
export default (integration: AbsentLanguageIntegration): CreateStoreReturn => {
  const defaultEditorState: EditorStateWithoutIntegration = {
    integrationId: null,
    grammar: null,
    primitives: null,
    keyToNewSynoAttrs: null,
    lastIntegrationBindings: null,
    synoMap: null,
    resultTree: null,
    inverseReferenceMap: null,
    focus: null,
    resultSyntreeRootId: null,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  };
  const stateSelector: StateSelector = createState(defaultEditorState);

  const editorStateReducer = (
    oldState: EditorState = defaultEditorState,
    action: ReduxAction,
  ): EditorState => {
    return produce(oldState, untypedDraftState => {
      const draftState = untypedDraftState as any as MutableEditorState;

      switch (action.type) {
        case 'REPLACE_FOCUSED_SYNO': {
          replaceFocusedSynoReducer(
            stateSelector,
            action,
            draftState,
            integration,
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

        case 'END_INTEGRATION_LOAD': {
          endIntegrationLoadReducer(
            stateSelector,
            action,
            draftState,
            integration,
          );
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
          startInterpretationReducer(stateSelector, draftState, integration);
          break;
        }

        case 'START_SYNTREE_LOAD': {
          startSyntreeLoadReducer(stateSelector, draftState);
          break;
        }

        case 'START_INTEGRATION_LOAD': {
          startIntegrationLoadReducer(draftState);
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
  // @ts-ignore: how do I let ts know it's OK to get undefined?
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const editorStateStore = createStore(
    editorStateReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );
  const integrationDependencies = {
    React,
    // pass in our react instance so integrations don't need to bundle their own
    components: {
      NamePart,
    },
  };

  // const rootEpic = (action$, state$) => merge(loadIntegrationEpic(action$, integrationDependencies), loadSyntreeEpic(action$, state$, stateSelector, integration), interpretEpic(action$, state$, stateSelector, integration));
  const rootEpic = (action$, state$) => merge(
    loadIntegrationEpic(action$, integrationDependencies),
    loadSyntreeEpic(action$, state$, stateSelector, integration),
    interpretEpic(action$, state$, stateSelector, integration),
  );

  // @ts-ignore: is this a conflict in redux-observables types?
  epicMiddleware.run(rootEpic);
  return {
    editorStateStore,
    stateSelector,
  };
};
