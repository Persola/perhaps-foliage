import { enableMapSet } from 'immer';

import createEditorStateStore from './editor-core/create-editor-state-store';
import createPresent from './presenter/create-present';
import createInputResolver from './input-resolver/create-input-resolver';

import type { CoresideLanguageIntegration } from './types/language-integration/coreside-language-integration';
import type { CoresidePresentLanguageIntegration } from './types/language-integration/coreside-present-language-integration';
import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from './types/cross-context/cross-context-messaging';
import type { DispatchAction } from './types/cross-context/messages-from-renderer/dispatch-action';
import type { ResolveInput } from './types/cross-context/messages-from-renderer/resolve-input';
import type { SynoMap } from './types/syntactic/syno-map';
import type { UnistlikeEdit } from './types/unistlike/unistlike-edit';
import type { DocumentStateTrackerInterface } from './types/document-state-tracker';

const lastestEdit: UnistlikeEdit[] = [];

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
  emitDocumentChange: (edit: UnistlikeEdit) => void,
  documentStateTracker: DocumentStateTrackerInterface,
  initialLanguageIntegration: (CoresidePresentLanguageIntegration | null),
  initialDocument: (SynoMap | null),
): void => {
  enableMapSet();

  if (initialLanguageIntegration === null && initialDocument !== null) {
    throw new Error('Cannot initialize editor with a document but without a language integration.');
  }

  /*
    The integration is a mutable object storing unserializable 3rd party scripts and therefore has
    state independant of the editor state. It is kept in sync with language loads in
    editorStateSubscription below.
  */
  const integration: CoresideLanguageIntegration = initialLanguageIntegration || {
    id: null,
    grammar: null,
    primitives: null,
    keyToNewSynoAttrs: null,
    interpret: null,
    presenters: null,
  };

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
  );

  if (documentStateTracker) {
    documentStateTracker.setStateSelector(stateSelector);
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

    if (emitDocumentChange && lastestEdit.length !== 0) {
      if (lastestEdit.length !== 1) {
        throw new Error('getting multiple latest edits');
      }
      emitDocumentChange(lastestEdit.pop());
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
