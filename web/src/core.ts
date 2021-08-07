import initializeCoreWorker from 'saliva-repl/dist/initialize-core-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';

if (typeof window !== 'undefined') {
  throw new Error('This script must be run in a shared web worker, not the main thread');
}

// @ts-ignore: how to tell typescript this will be run as a shared worker?
onconnect = connectEvent => {
  const port = connectEvent.ports[0];

  let registerCrossContextMessageHandler: CrossContextMessageHandlerRegister;
  (() => {
    const handlers = {};

    registerCrossContextMessageHandler = (type, callback) => {
      handlers[type] = callback;
    };

    port.onmessage = (ev: MessageEvent) => {
      const handler = handlers[ev.data.type];
      if (typeof handler !== 'function') {
        throw new Error(`Received message of invalid type '${ev.data.type}' from renderer`);
      }
      handler(ev.data.data);
    };
  })();

  const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
    port.postMessage({
      type,
      data,
    });
  };

  initializeCoreWorker(registerCrossContextMessageHandler, sendCrossContextMessage);
};
