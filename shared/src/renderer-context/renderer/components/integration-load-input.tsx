import * as React from 'react';

import createRenderers from '../generate-renderers';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { RendersidePresentLanguageIntegration } from '../../../types/language-integration/renderside-present-language-integration';
import type { UninitializedPresentLanguageIntegration } from '../../../types/language-integration/uninitialized-present-language-integration';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersidePresentLanguageIntegration;
};

const dispatchIntegrationLoad = (e, sendCrossContextMessage, oldIntegration) => {
  if (e.target.files.length === 1) { // ignore on cancel
    e.target.files[0].text().then(fileText => {
      let initializeIntegration;
      eval(fileText); // eslint-disable-line no-eval
      const newIntegration: UninitializedPresentLanguageIntegration = ( // type is lie
        initializeIntegration.default
      );
      Object.assign(oldIntegration, {
        keyToNewSynoAttrs: newIntegration.keyToNewSynoAttrs,
        renderers: createRenderers(newIntegration),
        styles: newIntegration.styles,
      });
      sendCrossContextMessage(
        'dispatchAction',
        {
          action: {
            type: 'START_INTEGRATION_HOTLOAD',
            fileText,
          },
        },
      );
    });
  }
};

export default (props: Props): JSX.Element => {
  const { sendCrossContextMessage, integration } = props;

  const loadIntegration = e => dispatchIntegrationLoad(e, sendCrossContextMessage, integration);

  return (
    <input
      type="file"
      id="integrationLoad"
      name="integrationLoad"
      accept="text/javascript"
      onChange={loadIntegration}
    />
  );
};
