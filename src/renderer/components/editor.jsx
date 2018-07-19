// @flow
import React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { EditorPresentation } from '../../types/presentations/editor-presentation.js'

type Props = {
  presentation: EditorPresentation,
  interpret: Function,
  resultOutdated: boolean,
  interpreting: boolean
}

export default (props: Props) => {
  const {
    interpret,
    presentation: { stage: stageful, result },
    resultOutdated,
    interpreting
  } = props;

  return (
    <div className="editor mousetrap">
      <CodeView
        key="stage"
        codePresentation={stageful}
        outdated={false}
        interpreting={interpreting}
      />
      <InterpretButton interpret={interpret} interpreting={interpreting} />
      <CodeView
        key="result"
        codePresentation={result}
        outdated={resultOutdated}
        interpreting={false}
      />
    </div>
  );
};
