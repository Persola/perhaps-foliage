// @flow
import * as React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { ReduxStore } from '../../types/redux-store';
import type { EditorPresentation } from '../../types/presenter/editor-presentation.js';
import type { GrammarName } from '../../types/editor-state/grammar-name.js';

type Props = {
  editorStateStore: ReduxStore,
  grammarName: GrammarName,
  presentation: EditorPresentation,
  resultOutdated: boolean,
  interpreting: boolean
}

export default (props: Props): React.Node => {
  const {
    editorStateStore,
    grammarName,
    presentation: { stage: stageful, result },
    resultOutdated,
    interpreting,
  } = props;

  return (
    <div className="editor mousetrap">
      <CodeView
        key="stage"
        grammarName={grammarName}
        codePresentation={stageful}
        outdated={false}
        interpreting={interpreting}
        dragDrop
      />
      <InterpretButton
        editorStateStore={editorStateStore}
        interpreting={interpreting}
      />
      <CodeView
        key="result"
        grammarName={grammarName}
        codePresentation={result}
        outdated={resultOutdated}
        interpreting={false}
        dragDrop={false}
      />
    </div>
  );
};
