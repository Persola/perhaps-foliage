import * as React from 'react';

import createRenderers from '../../create-renderers';

import Text from './vis/text';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { RendersidePresentLanguageIntegration } from '../../../types/language-integration/renderside-present-language-integration';
import type { RendersideUninitializedPresentLanguageIntegration } from '../../../types/language-integration/renderside-uninitialized-present-language-integration';
import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersidePresentLanguageIntegration;
};

const dispatchIntegrationLoad = (e, sendCrossContextMessage, oldIntegration) => {
  if (e.target.files.length === 1) { // ignore on cancel
    e.target.files[0].text().then(fileText => {
      let initializeIntegration;
      eval(fileText); // eslint-disable-line no-eval
      const integrationDependencies: IntegrationDependencies = {
        React, // pass in our react instance so integrations don't need to bundle their own
        components: { Text },
      };
      const newIntegration: RendersideUninitializedPresentLanguageIntegration = (
        initializeIntegration.default
      );
      Object.assign(oldIntegration, {
        keyToNewSynoAttrs: newIntegration.keyToNewSynoAttrs,
        renderers: createRenderers(integrationDependencies, newIntegration),
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
