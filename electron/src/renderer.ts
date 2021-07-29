import initializeRendererWorker from '../../src/initialize-renderer-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from '../../src/types/cross-context/cross-context-messaging';

if (typeof window === 'undefined') {
  throw new Error('This script must be run in a renderer process, not the main process');
}

const registerCrossContextMessageHandler: CrossContextMessageHandlerRegister = (
  messageType,
  callback,
) => {
  window.bridged.onCrossContextMessage(messageType, (event, arg) => {
    callback(arg);
  });
};

initializeRendererWorker(
  registerCrossContextMessageHandler,
  (window.bridged.sendCrossContextMessage as CrossContextMessageSender),
);
