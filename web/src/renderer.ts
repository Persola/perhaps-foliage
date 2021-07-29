import initializeRendererWorker from '../../src/initialize-renderer-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../../src/types/cross-context/cross-context-messaging';

if (typeof window === 'undefined') {
  throw new Error('This script must be run in the main thread, not a web worker');
}

const core = new SharedWorker('./core.js', 'saliva-repl-core');

let registerCrossContextMessageHandler: CrossContextMessageHandlerRegister;
(() => {
  const handlers = {};

  registerCrossContextMessageHandler = (type, callback) => {
    handlers[type] = callback;
  };

  core.port.onmessage = (ev: MessageEvent) => {
    handlers[ev.data.type](ev.data.data);
  };
})();

const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
  core.port.postMessage({
    type,
    data,
  });
};

initializeRendererWorker(registerCrossContextMessageHandler, sendCrossContextMessage);
