import coreTextModeBindings from './core-bindings/core-text-mode-bindings';

import type { CommandResolver } from '../../../types/input-resolver/command-resolver';

export default (
  input: string,
): CommandResolver => {
  if (Object.keys(coreTextModeBindings).includes(input)) {
    return coreTextModeBindings[input];
  }

  return null;
};
