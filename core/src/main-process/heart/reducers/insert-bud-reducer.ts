import childSynos from '../../syntactic-interface/read-node/child-synos';

import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { InsertBud } from '../../../types/actions/commands/insert-bud';
import type { StateSelector } from '../../../types/state-selector';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: InsertBud,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring INSERT_BUD action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring INSERT_BUD action: no tree loaded');
    return;
  }

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring INSERT_BUD action: can\'t insert sibling without parent');
    return;
  }

  if (state.focus().budIndex !== null) {
    // new bud subsumed into currently focused bud
    return;
  }

  const oldParent = state.getSyno(state.focusedSyno().parent.id);
  const siblingRefz = childSynos(oldParent);

  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
  }

  const oldFocusedPresnoBirthOrder = siblingRefz.findIndex((siblingRef, sibIndex) => {
    if (state.synoMap()[siblingRef.id]) {
      return siblingRef.id === state.focusedSynoId();
    }

    throw new Error('presnos should be inaccessible');
    return sibIndex === state.focusedPresnoIndex();
  });

  if (oldFocusedPresnoBirthOrder === -1) {
    throw new Error(
      "Cannot find old focused presno ID among parent's children",
    );
  }

  draftState.focus = {
    ...draftState.focus,
    synoId: state.focusedSyno().parent.id,
    budIndex: oldFocusedPresnoBirthOrder + (action.direction === 'before' ? 0 : 1),
  };
};
