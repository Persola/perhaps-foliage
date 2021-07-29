import Renderer from './renderer/renderer';
import updateInputBindings from './renderer-staging-area/update-input-bindings';
import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from './types/cross-context/cross-context-messaging';
import type { RendersideLanguageIntegration } from './types/language-integration/renderside-language-integration';
import type { Render } from './types/cross-context/messages-from-core/render';

import './editor-styles.css';

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
): void => {
  const renderer = new Renderer(document);
  const integration: RendersideLanguageIntegration = {
    id: null,
    grammar: null,
    primitives: null,
    keyToNewSynoAttrs: null,
    renderers: null,
    styles: null,
  };

  registerCrossContextMessageHandler('render', (data: Render) => {
    renderer.render(
      sendCrossContextMessage,
      data.presentation,
      data.resultOutdated,
      data.interpreting,
      integration,
    );

    updateInputBindings(
      sendCrossContextMessage,
      integration.keyToNewSynoAttrs ? Object.keys(integration.keyToNewSynoAttrs) : [],
      data.inputsToUnbind || [],
    );
  });

  window.addEventListener('load', () => {
    updateInputBindings(
      sendCrossContextMessage,
      ['enter', 'left', 'right', 'up', 'down', 'backspace'],
      [],
    );
    document.documentElement.click(); // bindings don't work before this (focus?)
    // document.addEventListener('click', createFocusSyno(editorStateStore));
    sendCrossContextMessage(
      'dispatchAction',
      {
        action: {
          type: 'INITIALIZE',
        },
      },
    );
  });
};
