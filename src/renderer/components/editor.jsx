// @flow
import React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { presentation } from '../../types/presentations/presentation.js' // eslint-disable-line no-unused-vars

type Props = {
  presentation: presentation,
  interpret: Function,
  resultOutdated: boolean
}

export default (props: Props) => {
  const {
    interpret,
    presentation: { stage: stageful, result },
    resultOutdated
  } = props;

  return (
    <div className="editor mousetrap">
      <CodeView
        key="stage"
        codePresentation={stageful}
        outdated={false}
      />
      <InterpretButton interpret={interpret} />
      <CodeView
        key="result"
        codePresentation={result || false}
        outdated={resultOutdated}
      />
    </div>
  );
};
