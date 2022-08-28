import * as Mousetrap from 'mousetrap';
import type { CrossContextMessageSender } from '../types/cross-context/cross-context-messaging';

export default (
  sendCrossContextMessage: CrossContextMessageSender,
  inputsToBind: string[],
  inputsToUnbind: string[],
): void => {
  inputsToUnbind.forEach(input => Mousetrap.unbind(input));

  Mousetrap.bind(inputsToBind, (e, input) => {
    if (['up', 'down', 'backspace'].includes(input)) {
      e.preventDefault();
    }

    sendCrossContextMessage('resolveInput', { input });
  });
};
