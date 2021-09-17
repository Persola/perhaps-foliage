import * as React from 'react';

import Text from './vis/text';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { RendersideLanguageIntegration } from '../../../types/language-integration/renderside-language-integration';
import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLanguageIntegration;
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
      const newIntegration = initializeIntegration.default(integrationDependencies);
      Object.assign(oldIntegration, {
        keyToNewSynoAttrs: newIntegration.keyToNewSynoAttrs,
        renderers: newIntegration.renderers,
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
