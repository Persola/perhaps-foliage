import initializeRendererProcess from 'saliva-repl/dist/renderer-process/initialize-renderer-process';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';

if (typeof window === 'undefined') {
  throw new Error('This script must be run in the main thread, not a web worker');
}

const main = new SharedWorker('./main.js', 'saliva-repl-main');

let registerCrossContextMessageHandler: CrossContextMessageHandlerRegister;
(() => {
  const handlers = {};

  registerCrossContextMessageHandler = (type, callback) => {
    handlers[type] = callback;
  };

  main.port.onmessage = (ev: MessageEvent) => {
    const handler = handlers[ev.data.type];
    if (typeof handler !== 'function') {
      throw new Error(`Received message of invalid type '${ev.data.type}' from main`);
    }
    handler(ev.data.data);
  };
})();

const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
  main.port.postMessage({
    type,
    data,
  });
};

initializeRendererProcess(
  registerCrossContextMessageHandler,
  sendCrossContextMessage,
  null,
);
