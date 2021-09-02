import { createStore, compose, applyMiddleware } from 'redux';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';
import * as React from 'react';

import type { Store, Action } from 'redux';

import createState from '../../selectors/create-state-selector';
import verifyType from './reducers/util/verify-action-type';
import deriveInverseReferenceMap from './derive-inverse-reference-map';
import ascendToRoot from '../../syntree-utils/ascend-to-root';

import replaceFocusedSynoReducer from './reducers/replace-focused-syno-reducer';
import endInterpretationReducer from './reducers/end-interpretation-reducer';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer';
import endIntegrationHotloadReducer from './reducers/end-integration-hotload-reducer';
import navigateReducer from './reducers/navigate-reducer';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer';
import startInterpretationReducer from './reducers/start-interpretation-reducer';
import startIntegrationHotloadReducer from './reducers/start-integration-hotload-reducer';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer';
import charBackspaceReducer from './reducers/char-backspace-reducer';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer';

import loadIntegrationEpic from './epics/load-integration';
import loadSyntreeEpic from './epics/load-syntree';
import interpretEpic from './epics/interpret';

import NamePart from '../../renderer-context/renderer/components/vis/name-part';

import type { ReplaceFocusedSyno } from '../../types/actions/replace-focused-syno';
import type { EndInterpretation } from '../../types/actions/end-interpretation';
import type { EndAsyncSyntreeLoad } from '../../types/actions/end-syntree-load';
import type { EndIntegrationHotload } from '../../types/actions/end-integration-hotload';
import type { Navigate } from '../../types/actions/navigate';
import type { SetFocusSyno } from '../../types/actions/set-focus-syno';
import type { DestroyFocusedSyno } from '../../types/actions/destroy-focused-syno';

import type { StateSelector } from '../../types/state-selector';
import type { CoresideLanguageIntegration } from '../../types/language-integration/coreside-language-integration';
import type { SynoMap } from '../../types/syntactic/syno-map';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';
import type { Warn } from '../../types/cross-context/warn';
import type { EditorState } from '../../types/editor-state';
import type { MutableEditorState } from '../../types/mutable-editor-state';

type CreateStoreReturn = {
  editorStateStore: Store;
  stateSelector: StateSelector;
};

export default (
  integration: CoresideLanguageIntegration,
  initialDocument: SynoMap,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): CreateStoreReturn => {
  let focus;
  let synoMap;
  let inverseReferenceMap;
  if (initialDocument) {
    const rootSyno = ascendToRoot(Object.keys(initialDocument)[0], initialDocument);
    focus = {
      synoId: rootSyno.id,
      presnoIndex: null,
      charIndex: null,
    };
    synoMap = initialDocument;
    inverseReferenceMap = deriveInverseReferenceMap(
      initialDocument,
      rootSyno.id,
      integration.primitives,
    );
  } else {
    focus = null;
    synoMap = null;
    inverseReferenceMap = null;
  }
  const defaultEditorState: EditorState = {
    integrationId: integration.id,
    grammar: integration.grammar,
    primitives: integration.primitives,
    keyToNewSynoAttrs: integration.keyToNewSynoAttrs,
    lastIntegrationBindings: null,
    synoMap,
    resultTree: null,
    inverseReferenceMap,
    focus,
    resultSyntreeRootId: null,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  };

  const stateSelector: StateSelector = createState(defaultEditorState);

  const editorStateReducer = (
    oldState: EditorState = defaultEditorState,
    action: Action,
  ): EditorState => {
    return produce(oldState, untypedDraftState => {
      const draftState = untypedDraftState as MutableEditorState;

      switch (action.type) {
        case 'INITIALIZE': {
          break;
        }

        case 'REPLACE_FOCUSED_SYNO': {
          replaceFocusedSynoReducer(
            stateSelector,
            (action as ReplaceFocusedSyno),
            draftState,
            integration,
            latestEdit,
            warnUser,
          );
          break;
        }

        case 'END_INTERPRETATION': {
          endInterpretationReducer(
            stateSelector,
            (action as EndInterpretation),
            draftState,
            warnUser,
          );
          break;
        }

        case 'END_SYNTREE_LOAD': {
          endSyntreeLoadReducer(
            stateSelector,
            (action as EndAsyncSyntreeLoad),
            draftState,
            warnUser,
          );
          break;
        }

        case 'END_INTEGRATION_LOAD': {
          endIntegrationHotloadReducer(
            stateSelector,
            (action as EndIntegrationHotload),
            draftState,
            integration,
          );
          break;
        }

        case 'NAVIGATE': {
          navigateReducer(
            stateSelector,
            (action as Navigate),
            draftState,
            warnUser,
          );
          break;
        }

        case 'SET_FOCUS_SYNO': {
          setFocusSynoReducer(
            stateSelector,
            (action as SetFocusSyno),
            draftState,
            warnUser,
          );
          break;
        }

        case 'START_INTERPRETATION': {
          startInterpretationReducer(
            stateSelector,
            draftState,
            integration,
            warnUser,
          );
          break;
        }

        case 'START_SYNTREE_LOAD': {
          startSyntreeLoadReducer(
            stateSelector,
            draftState,
            warnUser,
          );
          break;
        }

        case 'START_INTEGRATION_HOTLOAD': {
          startIntegrationHotloadReducer(draftState);
          break;
        }

        case 'CHAR_BACKSPACE': {
          charBackspaceReducer(
            stateSelector,
            draftState,
            latestEdit,
            warnUser,
          );
          break;
        }

        case 'DESTROY_FOCUSED_SYNO': {
          destroyFocusedSynoReducer(
            stateSelector,
            (action as DestroyFocusedSyno),
            draftState,
            latestEdit,
            warnUser,
          );
          break;
        }

        default: {
          verifyType(action.type);
          break;
        }
      }
    });
  };

  const epicMiddleware = createEpicMiddleware();
  // @ts-ignore: how do I let ts know it's OK to get undefined?
  const composeEnhancers = (WEB_VERSION === true)// @ts-ignore: we know because of WEB_VERSION
    ? (self.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) // eslint-disable-line
    : compose;
  const editorStateStore = createStore(
    editorStateReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );
  const integrationDependencies = {
    React, // pass in our react instance so integrations don't need to bundle their own
    components: {
      NamePart,
    },
  };

  const rootEpic = (action$, state$) => merge(
    loadIntegrationEpic(action$, integrationDependencies),
    loadSyntreeEpic(action$, state$, stateSelector, integration),
    interpretEpic(action$, state$, stateSelector, integration, warnUser),
  );

  epicMiddleware.run(rootEpic);

  return {
    editorStateStore,
    stateSelector,
  };
};