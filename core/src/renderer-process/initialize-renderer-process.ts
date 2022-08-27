import updateRendersideIntegration from './update-renderside-integration';
import Renderer from './renderer/renderer';
import updateInputBindings from './update-input-bindings';
import onPointerMove from './on-pointer-move';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../types/cross-context/cross-context-messaging';
import type { RendersideLangInt } from '../types/language-integration/interfaces/renderside/renderside-lang-int';
import type { Render } from '../types/cross-context/messages-from-main/render';
import type { Warn } from '../types/cross-context/messages-from-main/warn';
import type { RendersideUninitializedPresentLangInt } from '../types/language-integration/interfaces/renderside/renderside-uninitialized-present-lang-int';

import '../editor-styles.css';

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
  initialRendererIntegration: (RendersideUninitializedPresentLangInt | null),
): void => {
  const integration: RendersideLangInt = {
    id: null,
    keyToNewSynoAttrs: null,
    renderers: null,
    styles: null,
  };

  if (initialRendererIntegration) {
    updateRendersideIntegration(integration, initialRendererIntegration);
  }

  const renderer = new Renderer(document);

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
      integration.keyToNewSynoAttrs
        ? Object.keys((integration as RendersideLangInt).keyToNewSynoAttrs)
        : [],
      data.inputsToUnbind || [],
    );
  });

  registerCrossContextMessageHandler('warn', (data: Warn) => {
    console.warn(data.warning);
  });

  document.body.onpointermove = onPointerMove;

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
