import updateRendersideIntegration from './update-renderside-integration';

import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';
import type { RendersidePresentLangInt } from '../types/language-integration/interfaces/renderside/renderside-present-lang-int';
import type { UninitializedPresentLangInt } from '../types/language-integration/interfaces/complete/uninitialized-present-lang-int';

export default (
  mutateeIntegration: RendersidePresentLangInt,
  fileText: string,
  sendCrossContextMessage: CrossContextMessageSender,
): void => {
  let initializeIntegration;

  eval(fileText); // eslint-disable-line no-eval

  const newIntegration: UninitializedPresentLangInt = (
    initializeIntegration.default
  );

  updateRendersideIntegration(mutateeIntegration, newIntegration);

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
