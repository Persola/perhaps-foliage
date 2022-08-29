import * as React from 'react';

import CodeView from './code-view';
import InterpretButton from './interpret-button';
import IntegrationLoadInput from './integration-load-input';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { EditorPresentation } from '../../../types/presenter/editor-presentation';
import type { RendersideLangInt } from '../../../types/language-integration/interfaces/renderside/renderside-lang-int';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLangInt;
  presentation: EditorPresentation;
  resultOutdated: boolean;
  interpreting: boolean;
};
export default (props: Props): JSX.Element => {
  const {
    sendCrossContextMessage,
    integration,
    presentation: { stage: stageful, result },
    resultOutdated,
    interpreting,
  } = props;
  return (
    <div className="editor">
      <IntegrationLoadInput
        sendCrossContextMessage={sendCrossContextMessage}
        integration={integration}
      />
      <CodeView
        key="stage"
        sendCrossContextMessage={sendCrossContextMessage}
        integration={integration}
        codePresentation={stageful}
        outdated={false}
        interpreting={interpreting}
        dragDrop
      />
      <InterpretButton
        sendCrossContextMessage={sendCrossContextMessage}
        interpreting={interpreting}
      />
      <CodeView
        key="result"
        sendCrossContextMessage={sendCrossContextMessage}
        integration={integration}
        codePresentation={result}
        outdated={resultOutdated}
        interpreting={false}
        dragDrop={false}
      />
    </div>
  );
};
