import updateRendersideIntegration from './update-renderside-integration';
import Renderer from './renderer/renderer';
import bindKeys from './bind-keys';
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
import createFocusSyno from '../main-process/input-resolver/create-focus-syno';

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
  });

  registerCrossContextMessageHandler('warn', (data: Warn) => {
    console.warn(data.warning);
  });

  document.body.onpointermove = onPointerMove;

  window.addEventListener('load', () => {
    bindKeys(sendCrossContextMessage);
    document.documentElement.click(); // bindings don't work before this (focus?)
    document.addEventListener('click', createFocusSyno(sendCrossContextMessage));
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
