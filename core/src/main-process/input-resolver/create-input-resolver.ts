import { Store } from 'redux';

import textModeInputResolver from './input-resolvers/text-mode-input-resolver';
import treeModeInputResolver from './input-resolvers/tree-mode-input-resolver';

import type { StateSelector } from '../../types/state-selector';
import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { Warn } from '../../types/cross-context/warn';
import type { CommandResolver } from '../../types/input-resolver/command-resolver';

export default (
  editorStateStore: Store,
  state: StateSelector,
  integration: MainsideLangInt,
  warnUser: Warn,
) => {
  return (input: string): void => {
    let commandResolver: CommandResolver;

    if (state.inText()) {
      commandResolver = textModeInputResolver(input);
    } else {
      commandResolver = treeModeInputResolver(input, integration);
    }

    if (commandResolver === null) {
      warnUser(`Ignoring bound input '${input}': did not resolve to command`);
    } else {
      editorStateStore.dispatch(
        commandResolver(input, state, integration),
      );
    }
  };
};
