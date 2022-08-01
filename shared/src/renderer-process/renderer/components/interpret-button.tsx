import * as React from 'react';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  interpreting: boolean;
};

const dispatchStartInterpretation = sendCrossContextMessage => {
  sendCrossContextMessage(
    'dispatchAction',
    {
      action: {
        type: 'START_INTERPRETATION',
      },
    },
  );
};

export default (props: Props): JSX.Element => {
  const { sendCrossContextMessage, interpreting } = props;
  const className = interpreting ? 'interpreting' : '';

  const startInterpretation = () => dispatchStartInterpretation(sendCrossContextMessage);

  return (
    <button onClick={startInterpretation} className={className} type="submit">
      interpret
    </button>
  );
};
