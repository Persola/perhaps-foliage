import { enableMapSet } from 'immer';

import updateMainsideIntegration from './update-mainside-integration';
import createEditorStateStore from './heart/create-editor-state-store';
import createPresent from './presenter/create-present';
import createInputResolver from './input-resolver/create-input-resolver';

import type { MainsideLangInt } from '../types/language-integration/interfaces/mainside/mainside-lang-int';
import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../types/cross-context/cross-context-messaging';
import type { Warn } from '../types/cross-context/warn';
import type { DispatchAction } from '../types/cross-context/messages-from-renderer/dispatch-action';
import type { ResolveInput } from '../types/cross-context/messages-from-renderer/resolve-input';
import type { UnistlikeEdit } from '../types/unistlike/unistlike-edit';
import type { VscodeMainParams } from '../types/vscode-main-params';

const lastestEdit: UnistlikeEdit[] = [];

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
  vscodeParams: (VscodeMainParams | null), // null for non-vscode builds
): void => {
  enableMapSet();

  if (
    vscodeParams
    && vscodeParams.initialLangInt === null
    && vscodeParams.initialDocument !== null
  ) {
    throw new Error('Cannot initialize editor with a document but without a language integration.');
  }

  /*
    The integration is a mutable object storing unserializable 3rd party scripts and therefore has
    state independant of the editor state. It is kept in sync with language loads in
    editorStateSubscription below.
  */
  const integration: MainsideLangInt = {
    id: null,
    actualGrammar: null,
    syntypeSchema: null,
    primitives: null,
    keyToNewSynoAttrs: null,
    interpret: null,
    synoValidators: null,
    presenters: null,
  };

  if (vscodeParams) {
    updateMainsideIntegration(integration, vscodeParams.initialLangInt);
  }

  const warnUser: Warn = (warning: string) => {
    sendCrossContextMessage('warn', {
      warning,
    });
  };

  let initialDocument = null;
  if (vscodeParams) {
    console.warn('Hopefully that graph is recognized by the grammar');
    initialDocument = vscodeParams.initialDocument;
  }

  /*
    The state selector generated here abstracts access to the editor's Redux state. Its reference to
    the most recent version of the state is update below in editorStateSubscription.
  */
  const {
    editorStateStore,
    stateSelector,
  } = createEditorStateStore(
    integration,
    initialDocument,
    lastestEdit,
    warnUser,
  );

  if (vscodeParams) {
    vscodeParams.documentStateTracker.setStateSelector(stateSelector);
  }

  const present = createPresent(
    stateSelector,
    editorStateStore,
    integration,
  );
  const inputResolver = createInputResolver(
    editorStateStore,
    stateSelector,
    integration,
  );

  registerCrossContextMessageHandler('dispatchAction', (data: DispatchAction) => {
    editorStateStore.dispatch(data.action);
  });

  registerCrossContextMessageHandler('resolveInput', (data: ResolveInput) => {
    inputResolver(data.input);
  });

  editorStateStore.subscribe(() => {
    stateSelector.state = editorStateStore.getState();

    if (vscodeParams && lastestEdit.length !== 0) {
      if (lastestEdit.length !== 1) {
        throw new Error('getting multiple latest edits');
      }
      vscodeParams.emitDocumentChange(lastestEdit.pop());
    } else {
      lastestEdit.length = 0;
    }

    const { resultOutdated, interpreting } = editorStateStore.getState();

    sendCrossContextMessage(
      'render',
      {
        presentation: present(),
        resultOutdated,
        interpreting,
        inputsToUnbind: stateSelector.lastIntegrationBindings(),
      },
    );
  });
};
