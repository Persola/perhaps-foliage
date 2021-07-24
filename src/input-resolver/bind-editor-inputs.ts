import * as Mousetrap from 'mousetrap';
import type { Store } from 'redux';
import createFocusSyno from './create-focus-syno';

export default (
  editorStateStore: Store,
  inputResolver: (input: string) => void,
): void => {
  Mousetrap.bind(
    ['enter', 'left', 'right', 'up', 'down', 'backspace'],
    (e, key) => {
      if (['up', 'down', 'backspace'].includes(key)) {
        e.preventDefault();
      }

      inputResolver(key);
    },
  );

  if (!document.documentElement) {
    throw new Error('document missing');
  }

  document.documentElement.click(); // bindings don't work before this (focus?)

  document.addEventListener('click', createFocusSyno(editorStateStore));
};
