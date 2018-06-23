// @flow
import React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { EditorPresentation } from '../../types/presentations/editor-presentation.js'

type Props = {
  presentation: EditorPresentation,
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
        codePresentation={result}
        outdated={resultOutdated}
      />
    </div>
  );
};
