import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import PerhapsFoliageEditorProvider from './extension/perhaps-foliage-editor-provider';

export function activate(context: vscode.ExtensionContext):void {
  console.log('SPACE DOGS In activate in foliage extesnion!');
  // The command has been defined in the package.json file
  const disposable = vscode.commands.registerCommand('saliva-repl.helloWorld', () => {
    console.log('in running command DOGS');
    vscode.window.showInformationMessage('WEEEETTLE bit of syrup');
  });
  context.subscriptions.push(disposable);

  // registerCustomEditorProvider

  context.subscriptions.push(PerhapsFoliageEditorProvider.register(context));
}

export function deactivate(): void {
  console.log('DEACTIVATE space dogs');
}
