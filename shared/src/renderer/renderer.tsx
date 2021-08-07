import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Editor from './components/editor';

import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';
import type { EditorPresentation } from '../types/presenter/editor-presentation';
import type { RendersideLanguageIntegration } from '../types/language-integration/renderside-language-integration';

export default class {
  editorEl;

  constructor(document: Document) {
    this.editorEl = document.getElementById('editor');
  }

  render(
    sendCrossContextMessage: CrossContextMessageSender,
    presentation: EditorPresentation,
    resultOutdated: boolean,
    interpreting: boolean,
    integration: RendersideLanguageIntegration,
  ): void {
    ReactDOM.render(
      <Editor
        sendCrossContextMessage={sendCrossContextMessage}
        integration={integration}
        presentation={presentation}
        resultOutdated={resultOutdated}
        interpreting={interpreting}
      />,
      this.editorEl,
    );

    if (integration.styles) {
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(integration.styles));
      head.appendChild(style);
    }
  }
}
