import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';

const PREVENT_DEFAULT_KEYS = [
  'ArrowDown',
  'ArrowUp',
  'Space',
];

const lastType = {};

const handle = (
  sendCrossContextMessage: CrossContextMessageSender,
  event: KeyboardEvent,
): void => {
  const { key, type } = event;

  if (PREVENT_DEFAULT_KEYS.includes(key)) {
    event.preventDefault();
  }

  if (type !== lastType[key]) {
    sendCrossContextMessage('resolveInput', {
      key,
      type,
    });
  }

  lastType[key] = type;
};

export default (
  sendCrossContextMessage: CrossContextMessageSender,
): void => {
  document.addEventListener(
    'keydown',
    event => handle(sendCrossContextMessage, event),
  );

  document.addEventListener(
    'keyup',
    event => handle(sendCrossContextMessage, event),
  );
};
