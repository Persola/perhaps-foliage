import * as React from 'react';
import { createRoot } from 'react-dom/client';

import Editor from './components/editor';

import type { CrossContextMessageSender } from '../../types/cross-context/cross-context-messaging';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { RendersideLangInt } from '../../types/language-integration/interfaces/renderside/renderside-lang-int';

export default class {
  reactRoot;

  constructor(document: Document) {
    this.reactRoot = createRoot(document.getElementById('editor'));
  }

  render(
    sendCrossContextMessage: CrossContextMessageSender,
    presentation: EditorPresentation,
    resultOutdated: boolean,
    interpreting: boolean,
    integration: RendersideLangInt,
  ): void {
    this.reactRoot.render(
      <Editor
        sendCrossContextMessage={sendCrossContextMessage}
        integration={integration}
        presentation={presentation}
        resultOutdated={resultOutdated}
        interpreting={interpreting}
      />,
    );

    if (integration.styles) {
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(integration.styles));
      head.appendChild(style);
    }
  }
}
