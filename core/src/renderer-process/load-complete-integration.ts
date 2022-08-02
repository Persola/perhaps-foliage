import createRenderers from './renderer/generate-renderers';

import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';
import type { RendersidePresentLanguageIntegration } from '../types/language-integration/renderside-present-language-integration';
import type { UninitializedPresentLanguageIntegration } from '../types/language-integration/uninitialized-present-language-integration';

export default (
  oldIntegration: RendersidePresentLanguageIntegration,
  fileText: string,
  sendCrossContextMessage: CrossContextMessageSender,
): void => {
  let initializeIntegration;
  eval(fileText); // eslint-disable-line no-eval
  const newIntegration: UninitializedPresentLanguageIntegration = (
    initializeIntegration.default
  );

  // update renderside integration
  Object.assign(oldIntegration, {
    keyToNewSynoAttrs: newIntegration.keyToNewSynoAttrs,
    renderers: createRenderers(newIntegration),
    styles: newIntegration.styles,
  });

  // have main update mainside integration
  sendCrossContextMessage(
    'dispatchAction',
    {
      action: {
        type: 'START_INTEGRATION_HOTLOAD',
        fileText,
      },
    },
  );
};
