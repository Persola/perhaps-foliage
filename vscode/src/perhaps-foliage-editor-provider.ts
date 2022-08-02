import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved

import initializeMainProcess from 'saliva-repl/dist/main-process/initialize-main-process';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';
import type { PresentLangInt } from 'saliva-repl/dist/types/language-integration/interfaces/complete/present-lang-int';

import UnistlikeDocument from './unistlike-document';
import WebviewCollection from './webview-collection';
import { disposeAll } from './dispose';

export default class PerhapsFoliageEditorProvider implements vscode.CustomEditorProvider {
  public static register(
    context: vscode.ExtensionContext,
    mainLangInt: PresentLangInt,
  ): void {
    const provider = new PerhapsFoliageEditorProvider(context, mainLangInt);
    const providerRegistration: vscode.Disposable = vscode.window.registerCustomEditorProvider(
      PerhapsFoliageEditorProvider.viewType,
      provider,
    );
    context.subscriptions.push(providerRegistration);
  }

  private static readonly viewType = 'saliva-repl.saliva-repl-custom-editor';

  private readonly webviews = new WebviewCollection();

  constructor(
    private readonly context: vscode.ExtensionContext,
    private mainLangInt: PresentLangInt,
  ) { }

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: { backupId?: string },
    // ignore cancellation token because its use cannot be properly typed (must return document)
  ): Promise<UnistlikeDocument> {
    const document: UnistlikeDocument = await UnistlikeDocument.create(
      uri,
      openContext.backupId,
    );

    const listeners: vscode.Disposable[] = [];

    listeners.push(document.onDidChange(e => {
      // Tell VS Code that the document has been edited by the use.
      this._onDidChangeCustomDocument.fire({
        document,
        ...e,
      });
    }));

    listeners.push(document.onVscodeDidChangeDoc(e => {
      throw new Error(`unimlemented: present and render all webviews ${e.toString().slice(0, 10)}`);
    }));

    document.onDidDispose(() => disposeAll(listeners));

    return document;
  }

  public async resolveCustomEditor(
    document: UnistlikeDocument,
    webviewPanel: vscode.WebviewPanel,
    // ignore cancellation token because we're not using async yet
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

      registerCrossContextMessageHandler('ready', () => {
        if (document.uri.scheme === 'untitled') {
          throw new Error('unimplemented: if doc is fresh?');
        }
      });

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

    if (this.webviews.count() !== 0) {
      throw new Error('unimplemented: opening second document for editor provider: need doc state');
    }

    initializeMainProcess(
      registerCrossContextMessageHandler,
      sendCrossContextMessage,
      {
        emitDocumentChange: edit => document.makeEdit(edit),
        documentStateTracker: document.documentStateTracker,
        initialLangInt: this.mainLangInt,
        initialDocument: document.initialDocumentState,
      },
    );

    this.webviews.add(document.uri, webviewPanel, sendCrossContextMessage);

    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    // const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
    //   console.log(`The doc has changed! would update view (unimplemented!) \n${e}`);
    // });

    // webviewPanel.onDidDispose(() => {
    //   changeDocumentSubscription.dispose();
    // });
  }

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentEditEvent<UnistlikeDocument>
  >();

  public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

  public saveCustomDocument( // eslint-disable-line
    document: UnistlikeDocument,
    cancellation: vscode.CancellationToken,
  ): Thenable<void> {
    return document.save(cancellation);
  }

  public saveCustomDocumentAs( // eslint-disable-line
    document: UnistlikeDocument,
    destination: vscode.Uri,
    cancellation: vscode.CancellationToken,
  ): Thenable<void> {
    return document.saveAs(destination, cancellation);
  }

  public revertCustomDocument( // eslint-disable-line
    document: UnistlikeDocument,
    cancellation: vscode.CancellationToken,
  ): Thenable<void> {
    return document.revert(cancellation);
  }

  public backupCustomDocument( // eslint-disable-line
    document: UnistlikeDocument,
    context: vscode.CustomDocumentBackupContext,
    cancellation: vscode.CancellationToken,
  ): Thenable<vscode.CustomDocumentBackup> {
    return document.backup(context.destination, cancellation);
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
