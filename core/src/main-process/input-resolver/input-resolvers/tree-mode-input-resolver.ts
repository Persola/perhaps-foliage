import coreTreeModeBindings from './core-bindings/core-tree-mode-bindings';

import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { CommandResolver } from '../../../types/input-resolver/command-resolver';

export default (
  input: string,
  integration: MainsideLangInt,
): CommandResolver => {
  if (Object.keys(coreTreeModeBindings).includes(input)) {
    return coreTreeModeBindings[input];
  }

  if (Object.keys(integration.keyToNewSynoAttrs).includes(input)) {
    return (_input, _state, _integration) => ({
      type: 'START_INTERPRETATION',
    });
  }

  return null;
};
