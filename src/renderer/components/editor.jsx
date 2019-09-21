// @flow
import React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { EditorPresentation } from '../../types/presenter/editor-presentation.js'
import type { GrammarName } from '../../types/editor-state/grammar-name.js'

type Props = {
  grammarName: GrammarName,
  presentation: EditorPresentation,
  interpret: Function,
  resultOutdated: boolean,
  interpreting: boolean
}

export default (props: Props) => {
  const {
    grammarName,
    presentation: { stage: stageful, result },
    interpret,
    resultOutdated,
    interpreting
  } = props;

  return (
    <div className="editor mousetrap">
      <CodeView
        key="stage"
        grammarName={grammarName}
        codePresentation={stageful}
        outdated={false}
        interpreting={interpreting}
      />
      <InterpretButton interpret={interpret} interpreting={interpreting} />
      <CodeView
        key="result"
        grammarName={grammarName}
        codePresentation={result}
        outdated={resultOutdated}
        interpreting={false}
      />
    </div>
  );
};
