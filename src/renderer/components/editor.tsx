import * as React from 'react';
import CodeView from './code-view';
import InterpretButton from './interpret-button';
import IntegrationLoadInput from './integration-load-input';
import type { ReduxStore } from '../../types/redux-store';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { LanguageIntegration } from '../../types/language-integration';

type Props = {
  editorStateStore: ReduxStore;
  integration: LanguageIntegration;
  presentation: EditorPresentation;
  resultOutdated: boolean;
  interpreting: boolean;
};
export default (props: Props) => {
  const {
    editorStateStore,
    integration,
    presentation: { stage: stageful, result },
    resultOutdated,
    interpreting,
  } = props;
  return (
    <div className="editor mousetrap">
      <IntegrationLoadInput editorStateStore={editorStateStore} />
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
