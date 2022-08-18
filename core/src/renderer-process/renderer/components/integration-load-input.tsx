import * as React from 'react';

import loadCompleteIntegration from '../../load-complete-integration';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { RendersideLangInt } from '../../../types/language-integration/interfaces/renderside/renderside-lang-int';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLangInt;
};

const loadIntegration = (e, sendCrossContextMessage, oldIntegration) => {
  if (e.target.files.length === 1) { // ignore on cancel
    e.target.files[0].text().then(fileText => {
      loadCompleteIntegration(
        oldIntegration,
        fileText,
        sendCrossContextMessage,
      );
    });
  }
};

export default (props: Props): JSX.Element => {
  const { sendCrossContextMessage, integration } = props;

  return (
    <input
      type="file"
      id="integrationLoad"
      name="integrationLoad"
      accept="text/javascript"
      onChange={e => loadIntegration(e, sendCrossContextMessage, integration)}
    />
  );
};
