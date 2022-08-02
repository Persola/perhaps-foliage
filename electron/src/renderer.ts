import initializeRendererProcess from 'perhaps-foliage/dist/renderer-process/initialize-renderer-process';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'perhaps-foliage/dist/types/cross-context/cross-context-messaging';

if (typeof window === 'undefined') {
  throw new Error('This script must be run in a renderer process, not the main process');
}

const registerCrossContextMessageHandler: CrossContextMessageHandlerRegister = (
  messageType,
  callback,
) => {
  // @ts-ignore: bridged is provided by the preload
  window.bridged.onCrossContextMessage(messageType, (event, arg) => {
    callback(arg);
  });
};

initializeRendererProcess(
  registerCrossContextMessageHandler,
  // @ts-ignore: bridged is provided by the preload
  (window.bridged.sendCrossContextMessage as CrossContextMessageSender),
  null,
);
