// @flow
import * as React from 'react';
import CodeView from './code-view.jsx';
import InterpretButton from './interpret-button.jsx';
import type { ReduxStore } from '../../types/redux-store';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { LanguageIntegration } from '../../types/language-integration';

type Props = {
  editorStateStore: ReduxStore,
  integration: LanguageIntegration,
  presentation: EditorPresentation,
  resultOutdated: boolean,
  interpreting: boolean
}

export default (props: Props): React.Node => {
  const {
    editorStateStore,
    integration,
    presentation: { stage: stageful, result },
    resultOutdated,
    interpreting,
  } = props;

  return (
    <div className="editor mousetrap">
      <CodeView
        key="stage"
        editorStateStore={editorStateStore}
        integration={integration}
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
        editorStateStore={editorStateStore}
        integration={integration}
        codePresentation={result}
        outdated={resultOutdated}
        interpreting={false}
        dragDrop={false}
      />
    </div>
  );
};
