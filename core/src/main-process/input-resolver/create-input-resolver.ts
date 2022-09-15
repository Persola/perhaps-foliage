import { Store } from 'redux';

import StateSelector from '../state-interface/state-selector';

import createCommandResolver from './input-resolvers/create-command-resolver';
import coreTextModeBindings from './input-resolvers/core-bindings/core-text-mode-bindings';
import coreTreeModeBindings from './input-resolvers/core-bindings/core-tree-mode-bindings';

import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { Warn } from '../../types/cross-context/warn';
import type { ResolveInput } from '../../types/cross-context/messages-from-renderer/resolve-input';
import type { Command } from '../../types/actions/command';

const lastEventTypeToKeyState = {
  keyup: 'up',
  keydown: 'down',
};
const keyStates: {[key: string]: ('up' | 'down' | 'used')} = {};

export default (
  editorStateStore: Store,
  state: StateSelector,
  integration: MainsideLangInt,
  warnUser: Warn,
  // eslint-disable-next-line
): (message: ResolveInput) => void => {
  const textModeInputResolver = createCommandResolver(coreTextModeBindings);
  const treeModeInputResolver = createCommandResolver(coreTreeModeBindings);

  return ({ key, type }: ResolveInput): void => {
    if (type === 'keyup' && keyStates[key] !== 'used') {
      let command: Command | void;

      if (state.inText()) {
        command = textModeInputResolver(key, keyStates);
      } else {
        command = treeModeInputResolver(key, keyStates);
      }

      if (!command && key in integration.keyToNewSynoAttrs) {
        command = {
          type: 'REPLACE_FOCUSED_SYNO',
          newSynoAttrs: integration.keyToNewSynoAttrs[key],
        };
      }

      if (!command) {
        warnUser(`Ignoring input '${key}': did not resolve to command`);
      } else {
        editorStateStore.dispatch(command);
      }
    }

    keyStates[key] = lastEventTypeToKeyState[type];
  };
};
