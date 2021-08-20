import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import PerhapsFoliageEditorProvider from 'saliva-repl-vscode/dist/perhaps-foliage-editor-provider';
import salivaCoreIntegration from 'saliva/built/saliva-core-integration';

export function activate(context: vscode.ExtensionContext):void {
  PerhapsFoliageEditorProvider.register(context, salivaCoreIntegration);
}

export function deactivate(): void {
  return undefined;
}
