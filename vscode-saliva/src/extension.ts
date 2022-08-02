import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import PerhapsFoliageEditorProvider from 'perhaps-foliage-vscode/dist/perhaps-foliage-editor-provider';
import salivaMainIntegration from 'saliva/built/saliva-builtin-main-integration';

export function activate(context: vscode.ExtensionContext):void {
  PerhapsFoliageEditorProvider.register(context, salivaMainIntegration);
}

export function deactivate(): void {
  return undefined;
}
