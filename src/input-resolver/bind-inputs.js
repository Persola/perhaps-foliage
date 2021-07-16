// @flow
import Mousetrap from 'mousetrap';

import createFocusSyno from './create-focus-syno';

import type { ReduxStore } from '../types/redux-store';
import type { KeyToNewSynoAttrs } from '../types/language-integration/key-to-new-syno-attrs';

export default (
  editorStateStore: ReduxStore,
  inputResolver: (string) => void,
  salivaKeyToNewSynoAttrs: KeyToNewSynoAttrs,
) => {
  Mousetrap.bind([
    'enter',
    'left',
    'right',
    'up',
    'down',
    'backspace',
  ].concat(Object.keys(salivaKeyToNewSynoAttrs)), (e, key) => {
    if ([
      'backspace',
      'up',
      'down',
    ].includes(key)) {
      e.preventDefault();
    }
    inputResolver(key);
  });

  if (document.documentElement === null) { throw new Error('document missing'); }
  document.documentElement.click(); // bindings don't work before this (focus?)
  document.addEventListener('click', createFocusSyno(editorStateStore));
};
