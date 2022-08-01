import * as Mousetrap from 'mousetrap';
import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';

export default (
  sendCrossContextMessage: CrossContextMessageSender,
  inputsToBind: string[],
  inputsToUnbind: string[],
): void => {
  Mousetrap.bind(inputsToBind, (e, key) => {
    if (['up', 'down', 'backspace'].includes(key)) {
      e.preventDefault();
    }

    sendCrossContextMessage('resolveInput', {
      input: key,
    });
  });

  inputsToUnbind.forEach(input => Mousetrap.unbind(input));
};
