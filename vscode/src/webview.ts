import initializeRendererWorker from 'saliva-repl/dist/initialize-renderer-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';
import type { RendersideUninitializedPresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/renderside-uninitialized-present-language-integration';

export default (
  rendererIntegration: RendersideUninitializedPresentLanguageIntegration,
): void => {
  let registerCrossContextMessageHandler: CrossContextMessageHandlerRegister;
  (() => {
    const handlers = {};
    registerCrossContextMessageHandler = (
      messageType,
      callback,
    ) => {
      handlers[messageType] = callback;
    };

    window.addEventListener('message', e => {
      const { type, data } = e.data;
      const handler = handlers[type];
      if (typeof handler !== 'function') {
        throw new Error(`Received message of invalid type '${type}' from renderer`);
      }
      handler(data);
    });
  })();

  // @ts-ignore this is available because we are in a VSCode webview
  const vscode = acquireVsCodeApi();

  const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
    vscode.postMessage({ type, data });
  };

  initializeRendererWorker(
    registerCrossContextMessageHandler,
    sendCrossContextMessage,
    rendererIntegration,
  );
};
