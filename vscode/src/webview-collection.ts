import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved
import type { CrossContextMessageSender } from 'perhaps-foliage/dist/types/cross-context/cross-context-messaging';

type WebviewEntry = {
  resource: string,
  webviewPanel: vscode.WebviewPanel,
  sendMessage: CrossContextMessageSender,
};

export default class WebviewCollection {
  private readonly _webviews = new Set<WebviewEntry>();

  /**
   * Get all known webviews for a given uri.
   */
  public getWebviewsMatchingUri(uri: vscode.Uri): Iterable<WebviewEntry> { // eslint-disable-line
    const key = uri.toString();
    const matchingWebviewEntries: WebviewEntry[] = [];
    this._webviews.forEach(entry => {
      if (entry.resource === key) {
        matchingWebviewEntries.push(entry);
      }
    });
    return matchingWebviewEntries;
  }

  public count(): number {
    return this._webviews.size;
  }

  /**
   * Add a new webview to the collection.
   */
  public add(
    uri: vscode.Uri,
    webviewPanel: vscode.WebviewPanel,
    sendMessage: CrossContextMessageSender,
  ): void {
    const entry: WebviewEntry = {
      resource: uri.toString(),
      webviewPanel,
      sendMessage,
    };
    this._webviews.add(entry);

    webviewPanel.onDidDispose(() => {
      this._webviews.delete(entry);
    });
  }
}
