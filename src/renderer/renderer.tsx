import * as React from 'react';
import * as ReactDOM from 'react-dom';

import type { Store } from 'redux';

import Editor from './components/editor';

import type { EditorPresentation } from '../types/presenter/editor-presentation';
import type { LanguageIntegration } from '../types/language-integration';

export default class {
 editorEl;

 constructor(document: Document) {
   this.editorEl = document.getElementById('editor');
 }

 render(
   editorStateStore: Store,
   presentation: EditorPresentation,
   integration: LanguageIntegration,
   resultOutdated: boolean,
   interpreting: boolean,
 ): void {
   ReactDOM.render(
     <Editor
       editorStateStore={editorStateStore}
       integration={integration}
       presentation={presentation}
       resultOutdated={resultOutdated}
       interpreting={interpreting}
     />,
     this.editorEl,
   );

   if (integration.styles) {
     integration.styles.use();
   }
 }
}
