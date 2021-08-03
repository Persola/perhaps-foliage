import initializeRendererWorker from '../../src/initialize-renderer-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../../src/types/cross-context/cross-context-messaging';

console.log('in WEBVIEW FILE');

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

const vscode = acquireVsCodeApi();

const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
  vscode.postMessage({ type, data });
};

initializeRendererWorker(registerCrossContextMessageHandler, sendCrossContextMessage);
