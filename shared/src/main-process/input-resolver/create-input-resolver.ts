import type { Store } from 'redux';

import synoCommandResolver from './input-resolver/syno-command-resolver';
import navigationCommandResolver from './input-resolver/navigation-command-resolver';
import textCommandResolver from './input-resolver/text-command-resolver';
import type { StateSelector } from '../../types/state-selector';
import type { MainsideLanguageIntegration } from '../../types/language-integration/mainside-language-integration';

export default (
  editorStateStore: Store,
  state: StateSelector,
  integration: MainsideLanguageIntegration,
): // eslint-disable-next-line function-paren-newline
((input: string) => void) => {
  return (input: string): void => {
    let command = null;

    if (input === 'enter') {
      command = {
        type: 'START_INTERPRETATION',
      };
    } else if (['left', 'right', 'up', 'down'].includes(input)) {
      command = navigationCommandResolver(input);
    } else if (state.inText()) {
      // text commands
      command = textCommandResolver(input); // } else if (focus.presnoIndex !== null) {
      //  throw new Error('this should be unreachable still');
      // because if the focus has a presnoIndex there should also be a charIndex
      // to do: commands for non-text presnos
    } else {
      command = synoCommandResolver(input, state, integration);
    }

    if (command) {
      editorStateStore.dispatch(command);
    } else {
      throw new Error('bad binding?');
    }
  };
};
