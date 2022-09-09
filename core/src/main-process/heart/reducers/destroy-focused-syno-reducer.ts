import StateMutator from '../../mutators/state-mutator';

import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';
import StateSelector from '../../selectors/state-selector';

export default (
  readState: StateSelector,
  writeState: StateMutator,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (readState.integrationLoaded() === false) {
    warnUser('Ignoring DESTROY_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (readState.treeLoaded() === false) {
    warnUser('Ignoring DESTROY_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  if (readState.inNonSynPresno()) {
    throw new TypeError(
      'DESTROY_FOCUSED_SYNO action received while not focused on syno level',
    );
  }

  if (readState.focusedSyno().isRoot()) {
    warnUser('Ignoring syno destruction: can\'t destroy root syno');
    return;
  }

  if (!readState.focusedSyno().tree.is(readState.editeeTree())) {
    warnUser('Ignoring syno destruction: can\'t destroy primitive or children');
    return;
  }

  latestEdit.push({
    undo: { type: 'CREATE_SYNO' },
    redo: { type: 'DELETE_SYNO' },
  });

  writeState.focusedSyno().destroy();
  writeState.focus().synoId = readState.focusedSyno().parent().id;
};
