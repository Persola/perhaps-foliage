import * as vscode from 'vscode'; // eslint-disable-line import/no-unresolved
import type { SynoMap } from 'saliva-repl/dist/types/syntactic/syno-map';
import type { UnistlikeEdit } from 'saliva-repl/dist/types/unistlike/unistlike-edit';
import type { DocumentStateTrackerInterface } from 'saliva-repl/dist/types/vscode-main-params';

import { Disposable } from './dispose';
import DocumentStateTracker from './document-state-tracker';

export default class UnistlikeDocument extends Disposable implements vscode.CustomDocument {
  static async create(
    uri: vscode.Uri,
    backupId: string | undefined,
  ): Promise<UnistlikeDocument | PromiseLike<UnistlikeDocument>> {
    const dataFile = typeof backupId === 'string' ? vscode.Uri.parse(backupId) : uri;
    const fileData = await UnistlikeDocument.readFile(dataFile);
    return new UnistlikeDocument(uri, fileData);
  }

  private static async readFile(uri: vscode.Uri): Promise<SynoMap> {
    if (uri.scheme === 'untitled') {
      return {};
    }

    const encoded = await vscode.workspace.fs.readFile(uri);
    return JSON.parse((new TextDecoder('utf-8')).decode(encoded));
  }

  private constructor(
    uri: vscode.Uri,
    initialContent: SynoMap,
  ) {
    super();
    this._uri = uri;
    this._initialDocumentState = initialContent;
    this._documentStateTracker = new DocumentStateTracker();
  }

  private readonly _uri: vscode.Uri;
  public get uri(): vscode.Uri { return this._uri; }

  private _initialDocumentState: SynoMap;
  public get initialDocumentState(): SynoMap { return this._initialDocumentState; }

  private _documentStateTracker: DocumentStateTrackerInterface;
  public get documentStateTracker(): DocumentStateTrackerInterface {
    return this._documentStateTracker;
  }

  private readonly _onDidDispose = this._register(new vscode.EventEmitter<void>());
  public readonly onDidDispose = this._onDidDispose.event;

  private readonly _onVscodeDidChangeDoc = this._register(new vscode.EventEmitter<{
    readonly content?: SynoMap;
  }>());
  public readonly onVscodeDidChangeDoc = this._onVscodeDidChangeDoc.event;

  private readonly _onWebviewDidChangeDoc = this._register(new vscode.EventEmitter<{
    readonly label: string,
    undo(): void,
    redo(): void,
  }>());
  public readonly onDidChange = this._onWebviewDidChangeDoc.event;

  dispose(): void {
    this._onDidDispose.fire();
    super.dispose();
  }

  makeEdit(edit: UnistlikeEdit): void {
    this._onWebviewDidChangeDoc.fire({
      label: edit.redo.type,
      undo: async () => {
        throw new Error('unimplemented: redo generic edit');
      },
      redo: async () => {
        throw new Error('unimplemented: redo generic edit');
      },
    });
  }

  async save(cancellation: vscode.CancellationToken): Promise<void> {
    await this.saveAs(this.uri, cancellation);
  }

  async saveAs(
    targetResource: vscode.Uri,
    cancellation: vscode.CancellationToken,
  ): Promise<void> {
    const stringified = JSON.stringify(this._documentStateTracker.getState());

    await undefined;
    if (cancellation.isCancellationRequested) { return; }

    const encoded = (new TextEncoder()).encode(stringified);

    await undefined;
    if (cancellation.isCancellationRequested) { return; }

    return vscode.workspace.fs.writeFile(
      targetResource,
      Uint8Array.from(encoded),
    );
  }

  async revert(
    _cancellation: vscode.CancellationToken,
  ): Promise<void> {
    const diskContent = await UnistlikeDocument.readFile(this.uri);
    throw new Error('unimplemented: revert document');
    // set edstst doc state from diskcontent
    if (_cancellation.isCancellationRequested) { return; }
    this._onVscodeDidChangeDoc.fire({
      content: diskContent,
    });
  }

  async backup(
    destination: vscode.Uri,
    cancellation: vscode.CancellationToken,
  ): Promise<vscode.CustomDocumentBackup> {
    await this.saveAs(destination, cancellation);

    return {
      id: destination.toString(),
      delete: async () => {
        try {
          await vscode.workspace.fs.delete(destination);
        } catch {
          // noop
        }
      },
    };
  }
}
