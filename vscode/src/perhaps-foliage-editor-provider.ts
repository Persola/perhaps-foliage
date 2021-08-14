import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import initializeCoreWorker from 'saliva-repl/dist/initialize-core-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

export default class PerhapsFoliageEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(
    context: vscode.ExtensionContext,
    integrationCore: PresentLanguageIntegration,
  ): void {
    const provider = new PerhapsFoliageEditorProvider(context, integrationCore);
    const providerRegistration: vscode.Disposable = vscode.window.registerCustomEditorProvider(
      PerhapsFoliageEditorProvider.viewType,
      provider,
    );
    context.subscriptions.push(providerRegistration);
  }

  private static readonly viewType = 'saliva-repl.saliva-repl-custom-editor';

  constructor(
    private readonly context: vscode.ExtensionContext,
    private integrationCore: PresentLanguageIntegration,
  ) { }

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
  ): Promise<void> {
    let registerCrossContextMessageHandler: CrossContextMessageHandlerRegister;
    (() => {
      const handlers = {};
      registerCrossContextMessageHandler = (
        messageType,
        callback,
      ) => {
        handlers[messageType] = callback;
      };

      webviewPanel.webview.onDidReceiveMessage(e => {
        const handler = handlers[e.type];
        if (typeof handler !== 'function') {
          throw new Error(`Received message of invalid type '${e.type}' from renderer`);
        }
        handler(e.data);
      });
    })();

    const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
      webviewPanel.webview.postMessage({ type, data });
    };

    initializeCoreWorker(
      registerCrossContextMessageHandler,
      sendCrossContextMessage,
      this.integrationCore,
      JSON.parse(document.getText()),
    );

    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
      console.log(`The doc has changed! would update view (unimplemented!) \n${e}`);
    });

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    // need to listen to onDidChangeTextDocument to update view
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    // Local path to script and css for the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        'built',
        'webview-with-renderers.js',
      ),
    );

    return /* html */`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Saliva REPL</title>
        </head>
        <body>
          <div id="editor" />
          <script defer src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }
}