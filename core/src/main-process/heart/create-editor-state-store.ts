import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { merge } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import produce from 'immer';

import type { Store, Action } from 'redux';

import StateSelector from '../selectors/state-selector';
import StateMutator from '../mutators/state-mutator';

import codeLoader from '../code-loader/code-loader';
import verifyType from './reducers/util/verify-action-type';

import endInterpretationReducer from './reducers/end-interpretation-reducer';
import endSyntreeLoadReducer from './reducers/end-syntree-load-reducer';
import endIntegrationHotloadReducer from './reducers/end-integration-hotload-reducer';
import navigateReducer from './reducers/navigate-reducer';
import setFocusSynoReducer from './reducers/set-focus-syno-reducer';
import startInterpretationReducer from './reducers/start-interpretation-reducer';
import startIntegrationHotloadReducer from './reducers/start-integration-hotload-reducer';
import startSyntreeLoadReducer from './reducers/start-syntree-load-reducer';
// import charBackspaceReducer from './reducers/char-backspace-reducer';
// import textNavigateReducer from './reducers/text-navigate-reducer';
// import exitTextPresno from './reducers/exit-text-presno-reducer';
import destroyFocusedSynoReducer from './reducers/destroy-focused-syno-reducer';
import insertBudReducer from './reducers/insert-bud-reducer';

import hotloadIntegrationEpic from './epics/hotload-integration';
import loadSyntreeEpic from './epics/load-syntree';
import interpretEpic from './epics/interpret';

import type { EndInterpretation } from '../../types/actions/end-interpretation';
import type { EndAsyncSyntreeLoad } from '../../types/actions/end-syntree-load';
import type { EndIntegrationHotload } from '../../types/actions/end-integration-hotload';
import type { Navigate } from '../../types/actions/commands/navigate';
import type { SetFocusSyno } from '../../types/actions/commands/set-focus-syno';
// import type { TextNavigate } from '../../types/actions/commands/text-navigate';
import type { InsertBud } from '../../types/actions/commands/insert-bud';

import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';
import type { Warn } from '../../types/cross-context/warn';
import type { EditorState } from '../../types/editor-state/editor-state';
import type { MutableEditorState } from '../../types/editor-state/mutable/mutable-editor-state';
import type { Focus } from '../../types/editor-state/focus';
import type { SerializedSyno } from '../../types/syntactic/newnew/serialized-syno';

type CreateStoreReturn = {
  editorStateStore: Store;
  stateSelector: StateSelector;
};

export default (
  integration: MainsideLangInt,
  initialSerializedTree: null | SerializedSyno,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): CreateStoreReturn => {
  let editeeTreeId;
  const trees = {};
  let focus: Focus;
  if (initialSerializedTree) {
    const initialTree = codeLoader.fromSerializedTree(initialSerializedTree);
    editeeTreeId = 'intialDocumentFromVscode';
    trees[editeeTreeId] = initialTree;
    focus = {
      synoId: initialTree.rootId,
      presnoIndex: null,
      budIndex: null,
      charIndex: null,
    };
  } else {
    editeeTreeId = null;
    focus = null;
  }
  const defaultEditorState: EditorState = {
    integrationId: integration.id,
    actualGrammar: integration.actualGrammar,
    syntacticTypeSchema: integration.syntacticTypeSchema,
    keyToNewSynoAttrs: integration.keyToNewSynoAttrs,
    trees,
    primitivesTreeId: null,
    editeeTreeId,
    resultTreeId: null,
    focus,
    interpreting: false,
    resultOutdated: false,
    loadingIntegration: false,
    loadingSyntree: false,
  };

  const stateSelector = new StateSelector(defaultEditorState);

  const editorStateReducer = (
    oldState: EditorState = defaultEditorState,
    action: Action,
  ): EditorState => {
    return produce(oldState, untypedDraftState => {
      const draftState = untypedDraftState as MutableEditorState;
      const stateMutator = new StateMutator(draftState);

      switch (action.type) {
        case 'INITIALIZE': {
          break;
        }

        case 'END_INTERPRETATION': {
          endInterpretationReducer(
            stateMutator,
            (action as EndInterpretation),
            stateSelector,
            warnUser,
          );
          break;
        }

        case 'END_SYNTREE_LOAD': {
          endSyntreeLoadReducer(
            stateMutator,
            (action as EndAsyncSyntreeLoad),
            warnUser,
          );
          break;
        }

        case 'END_INTEGRATION_LOAD': {
          endIntegrationHotloadReducer(
            stateMutator,
            (action as EndIntegrationHotload),
            integration,
          );
          break;
        }

        case 'NAVIGATE': {
          navigateReducer(
            stateMutator,
            (action as Navigate),
            warnUser,
          );
          break;
        }

        case 'SET_FOCUS_SYNO': {
          setFocusSynoReducer(
            (action as SetFocusSyno),
            stateMutator,
            warnUser,
          );
          break;
        }

        case 'START_INTERPRETATION': {
          startInterpretationReducer(
            stateSelector,
            stateMutator,
            integration,
            warnUser,
          );
          break;
        }

        case 'START_SYNTREE_LOAD': {
          startSyntreeLoadReducer(
            stateMutator,
            warnUser,
          );
          break;
        }

        case 'START_INTEGRATION_HOTLOAD': {
          startIntegrationHotloadReducer(
            stateMutator,
          );
          break;
        }

        // case 'CHAR_BACKSPACE': {
        //   charBackspaceReducer(
        //     stateMutator,
        //     latestEdit,
        //     warnUser,
        //   );
        //   break;
        // }

        // case 'TEXT_NAVIGATE': {
        //   textNavigateReducer(
        //     action as TextNavigate,
        //     stateMutator,
        //     latestEdit,
        //     warnUser,
        //   );
        //   break;
        // }

        // case 'EXIT_TEXT_PRESNO': {
        //   exitTextPresno(
        //     stateMutator,
        //   );
        //   break;
        // }

        case 'DESTROY_FOCUSED_SYNO': {
          destroyFocusedSynoReducer(
            stateSelector,
            stateMutator,
            latestEdit,
            warnUser,
          );
          break;
        }

        case 'INSERT_BUD': {
          insertBudReducer(
            stateSelector,
            stateMutator,
            (action as InsertBud),
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
