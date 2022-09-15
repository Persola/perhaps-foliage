import StateMutator from '../../state-interface/state-mutator';

import type { SetFocusSyno } from '../../../types/actions/commands/set-focus-syno';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  action: SetFocusSyno,
  writeState: StateMutator,
  warnUser: Warn,
): void => {
  if (writeState.integrationLoaded() === false) {
    warnUser('Ignoring SET_FOCUS_SYNO action: no integration loaded');
    return;
  }

  if (writeState.treeLoaded() === false) {
    warnUser('Ignoring SET_FOCUS_SYNO action: no tree loaded');
    return;
  }

  if (writeState.editeeTree().getSyno(action.synoId) === undefined) {
    warnUser('Ignoring SET_FOCUS_SYNO action: target syno not in input tree');
    return;
  }

  const focus = writeState.focus();

  Object.assign(focus, {
    synoId: action.synoId,
    presnoIndex: null,
    budIndex: null,
    charIndex: null,
  });
};
