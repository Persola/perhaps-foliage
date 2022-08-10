import createRenderers from './renderer/generation/generate-renderers';
import Renderer from './renderer/renderer';
import updateInputBindings from './update-input-bindings';

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
  const renderer = new Renderer(document);
  const integration: RendersideLangInt = {
    id: initialRendererIntegration ? initialRendererIntegration.id : null,
    keyToNewSynoAttrs: (
      initialRendererIntegration
        ? initialRendererIntegration.keyToNewSynoAttrs
        : null
    ),
    renderers: (
      initialRendererIntegration
        ? createRenderers(initialRendererIntegration)
        : null
    ),
    styles: initialRendererIntegration ? initialRendererIntegration.styles : null,
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

  registerCrossContextMessageHandler('warn', (data: Warn) => {
    console.warn(data.warning);
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
