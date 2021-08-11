import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import PerhapsFoliageEditorProvider from 'saliva-repl-vscode/dist/perhaps-foliage-editor-provider';
import integrationCore from 'saliva/dist/integration-core';

export function activate(context: vscode.ExtensionContext):void {
  PerhapsFoliageEditorProvider.register(context, integrationCore);
}

export function deactivate(): void {
  console.log('DEACTIVATE space dogs');
}
