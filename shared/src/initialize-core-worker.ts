import { enableMapSet } from 'immer';

import createEditorStateStore from './editor-core/create-editor-state-store';
import createPresent from './presenter/create-present';
import createInputResolver from './input-resolver/create-input-resolver';

import type { AbsentLanguageIntegration } from './types/language-integration/absent-language-integration';
import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from './types/cross-context/cross-context-messaging';
import type { DispatchAction } from './types/cross-context/messages-from-renderer/dispatch-action';
import type { ResolveInput } from './types/cross-context/messages-from-renderer/resolve-input';

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
): void => {
  enableMapSet();

  /*
    The integration is a mutable object storing unserializable 3rd party scripts and therefore has
    state independant of the editor state. It is kept in sync with language loads in
    editorStateSubscription below.
  */
  const integration: AbsentLanguageIntegration = {
    id: null,
    grammar: null,
    primitives: null,
    keyToNewSynoAttrs: null,
    interpret: null,
    presenters: null,
    renderers: null,
    styles: null,
  };

  /*
    The state selector generated here abstracts access to the editor's Redux state. Its reference to
    the most recent version of the state is update below in editorStateSubscription.
  */
  const { editorStateStore, stateSelector } = createEditorStateStore(integration);
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
