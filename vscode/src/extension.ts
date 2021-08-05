import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import PerhapsFoliageEditorProvider from './extension/perhaps-foliage-editor-provider';

export function activate(context: vscode.ExtensionContext):void {
  context.subscriptions.push(PerhapsFoliageEditorProvider.register(context));
}

export function deactivate(): void {
  console.log('DEACTIVATE space dogs');
}
