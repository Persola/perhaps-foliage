import type StateSelector from '../../selectors/state-selector';
import type StateMutator from '../../mutators/state-mutator';
import type { InsertBud } from '../../../types/actions/commands/insert-bud';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  readState: StateSelector,
  writeState: StateMutator,
  action: InsertBud,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (readState.integrationLoaded() === false) {
    warnUser('Ignoring INSERT_BUD action: no integration loaded');
    return;
  }

  if (readState.treeLoaded() === false) {
    warnUser('Ignoring INSERT_BUD action: no tree loaded');
    return;
  }

  if (readState.focusedSyno().isRoot()) {
    warnUser('Ignoring INSERT_BUD action: can\'t insert sibling without parent');
    return;
  }

  if (readState.focus().budIndex !== null) {
    // new bud subsumed into currently focused bud
    return;
  }

  Object.assign(writeState.focus(), {
    ...readState.focus,
    synoId: readState.focusedSyno().parent().id,
    budIndex: readState.focusedSyno().index() + (action.direction === 'before' ? 0 : 1),
  });
};
