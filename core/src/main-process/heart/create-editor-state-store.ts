import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';

import type { Store, Action } from 'redux';

import createStateSelector from '../../selectors/create-state-selector';
import verifyType from './reducers/util/verify-action-type';
import deriveInverseReferenceMap from './derive-inverse-reference-map';
import ascendToRoot from '../../syntree-utils/read-tree/ascend-to-root';

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
import textNavigateReducer from './reducers/text-navigate-reducer';
import exitTextPresno from './reducers/exit-text-presno-reducer';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer';
import insertBudReducer from './reducers/insert-bud-reducer';

import hotloadIntegrationEpic from './epics/hotload-integration';
import loadSyntreeEpic from './epics/load-syntree';
import interpretEpic from './epics/interpret';

import type { ReplaceFocusedSyno } from '../../types/actions/commands/replace-focused-syno';
import type { EndInterpretation } from '../../types/actions/end-interpretation';
import type { EndAsyncSyntreeLoad } from '../../types/actions/end-syntree-load';
import type { EndIntegrationHotload } from '../../types/actions/end-integration-hotload';
import type { Navigate } from '../../types/actions/commands/navigate';
import type { SetFocusSyno } from '../../types/actions/commands/set-focus-syno';
import type { TextNavigate } from '../../types/actions/commands/text-navigate';
import type { InsertBud } from '../../types/actions/commands/insert-bud';

import type { StateSelector } from '../../types/state-selector';
import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { SynoMap } from '../../types/syntactic/syno-map';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';
import type { Warn } from '../../types/cross-context/warn';
import type { EditorState } from '../../types/editor-state';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { Focus } from '../../types/editor-state/focus';

type CreateStoreReturn = {
  editorStateStore: Store;
  stateSelector: StateSelector;
};

export default (
  integration: MainsideLangInt,
  initialDocument: SynoMap,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): CreateStoreReturn => {
  let focus: Focus;
  let synoMap;
  let inverseReferenceMap;
  if (initialDocument) {
    const rootSyno = ascendToRoot(Object.keys(initialDocument)[0], initialDocument);
    focus = {
      synoId: rootSyno.id,
      presnoIndex: null,
      budIndex: null,
      charIndex: null,
    };
    synoMap = initialDocument;
    inverseReferenceMap = deriveInverseReferenceMap(initialDocument);
  } else {
    focus = null;
    synoMap = null;
    inverseReferenceMap = null;
  }
  const defaultEditorState: EditorState = {
    integrationId: integration.id,
    actualGrammar: integration.actualGrammar,
    syntypeSchema: integration.syntypeSchema,
    primitives: integration.primitives,
    keyToNewSynoAttrs: integration.keyToNewSynoAttrs,
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

  const stateSelector: StateSelector = createStateSelector(defaultEditorState);

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
            integration,
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

        case 'TEXT_NAVIGATE': {
          textNavigateReducer(
            stateSelector,
            action as TextNavigate,
            draftState,
            latestEdit,
            warnUser,
          );
          break;
        }

        case 'EXIT_TEXT_PRESNO': {
          exitTextPresno(
            stateSelector,
            draftState,
          );
          break;
        }

        case 'DESTROY_FOCUSED_SYNO': {
          destroyFocusedSynoReducer(
            stateSelector,
            draftState,
            latestEdit,
            warnUser,
          );
          break;
        }

        case 'INSERT_BUD': {
          insertBudReducer(
            stateSelector,
            (action as InsertBud),
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
  const composeEnhancers = composeWithDevTools({
    realtime: true,
    port: 8001,
    suppressConnectErrors: false,
  });
  const editorStateStore = createStore(
    editorStateReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );

  const rootEpic = (action$, state$) => merge(
    hotloadIntegrationEpic(action$),
    loadSyntreeEpic(action$, state$, stateSelector, integration),
    interpretEpic(action$, state$, stateSelector, integration, warnUser),
  );

  epicMiddleware.run(rootEpic);

  return {
    editorStateStore,
    stateSelector,
  };
};
