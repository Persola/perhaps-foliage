import * as React from 'react';

import Renderer from './renderer/renderer';
import Text from './renderer/components/vis/text';
import updateInputBindings from './update-input-bindings';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../types/cross-context/cross-context-messaging';
import type { RendersideLanguageIntegration } from '../types/language-integration/renderside-language-integration';
import type { Render } from '../types/cross-context/messages-from-core/render';
import type { Warn } from '../types/cross-context/messages-from-core/warn';
import type { IntegrationDependencies } from '../types/language-integration/integration-dependencies';
import type { RendersideUninitializedPresentLanguageIntegration } from '../types/language-integration/renderside-uninitialized-present-language-integration';

import '../editor-styles.css';

export default (
  registerCrossContextMessageHandler: CrossContextMessageHandlerRegister,
  sendCrossContextMessage: CrossContextMessageSender,
  initialRendererIntegration: (RendersideUninitializedPresentLanguageIntegration | null),
): void => {
  const renderer = new Renderer(document);
  const integrationDependencies: IntegrationDependencies = {
    React,
    components: { Text },
  };
  const integration: RendersideLanguageIntegration = {
    id: initialRendererIntegration ? initialRendererIntegration.id : null,
    keyToNewSynoAttrs: (
      initialRendererIntegration
        ? initialRendererIntegration.keyToNewSynoAttrs
        : null
    ),
    renderers: (
      initialRendererIntegration
        ? initialRendererIntegration.createRenderers(integrationDependencies)
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
