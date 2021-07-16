// @flow
import synoCommandResolver from './syno-command-resolver';
import navigationCommandResolver from './navigation-command-resolver';
import textCommandResolver from './text-command-resolver';

import type { ReduxStore } from '../types/redux-store';
import type { StateSelector } from '../types/state-selector';
import type { KeyToNewSynoAttrs } from '../types/language-integration/key-to-new-syno-attrs';

export default (
  editorStateStore: ReduxStore,
  state: StateSelector,
  salivaKeyToNewSynoAttrs: KeyToNewSynoAttrs,
  // eslint doesn't understand the parantheses around this type
  // eslint-disable-next-line function-paren-newline
): (string => void) => {
  return (
    (key: string): void => {
      let command = false;
      if (key === 'enter') {
        command = { type: 'START_INTERPRETATION' };
      } else if (['left', 'right', 'up', 'down'].includes(key)) {
        command = navigationCommandResolver(key, state);
      } else if (state.inText()) { // text commands
        command = textCommandResolver(key, state);
        // } else if (focus.presnoIndex !== false) {
        //   throw new Error('this should be unreachable still');
        // because if the focus has a presnoIndex there should also be a charIndex
        // to do: commands for non-text presnos
      } else {
        command = synoCommandResolver(key, state, salivaKeyToNewSynoAttrs);
      }

      if (command !== false) {
        editorStateStore.dispatch(command);
      } else {
        throw new Error('bad binding?');
      }
    }
  );
};
