// @flow
import synoCommandResolver from './input-resolver/syno-command-resolver';
import navigationCommandResolver from './input-resolver/navigation-command-resolver';
import textCommandResolver from './input-resolver/text-command-resolver';

import type { ReduxStore } from '../types/redux-store';
import type { StateSelector } from '../types/state-selector';
import type { LanguageIntegration } from '../types/language-integration';

export default (
  editorStateStore: ReduxStore,
  state: StateSelector,
  integration: LanguageIntegration,
  // eslint doesn't understand the parantheses around this type
  // eslint-disable-next-line function-paren-newline
): (string => void) => {
  return (
    (key: string): void => {
      let command = null;
      if (key === 'enter') {
        command = { type: 'START_INTERPRETATION' };
      } else if (['left', 'right', 'up', 'down'].includes(key)) {
        command = navigationCommandResolver(key);
      } else if (state.inText()) { // text commands
        command = textCommandResolver(key);
        // } else if (focus.presnoIndex !== null) {
        //   throw new Error('this should be unreachable still');
        // because if the focus has a presnoIndex there should also be a charIndex
        // to do: commands for non-text presnos
      } else {
        command = synoCommandResolver(key, state, integration);
      }

      if (command) {
        editorStateStore.dispatch(command);
      } else {
        throw new Error('bad binding?');
      }
    }
  );
};
