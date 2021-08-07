import * as React from 'react';

import NamePart from './vis/name-part';

import type { CrossContextMessageSender } from '../../types/cross-context/cross-context-messaging';
import type { RendersideLanguageIntegration } from '../../types/language-integration/renderside-language-integration';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLanguageIntegration;
};

const dispatchIntegrationLoad = (e, sendCrossContextMessage, oldIntegration) => {
  e.target.files[0].text().then(fileText => {
    let initializeIntegration;
    eval(fileText); // eslint-disable-line no-eval
    const integrationDependencies = {
      React, // pass in our react instance so integrations don't need to bundle their own
      components: {
        NamePart,
      },
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
          type: 'START_INTEGRATION_LOAD',
          fileText,
        },
      },
    );
  });
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
