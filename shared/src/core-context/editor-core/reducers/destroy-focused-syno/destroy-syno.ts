import getDraftSyno from '../draft-utils/get-draft-syno';
import forSynoRefIn from '../../../../syntree-utils/read-node/for-syno-ref-in';

import type { StateSelector } from '../../../../types/state-selector';
import type { DestroyFocusedSyno } from '../../../../types/actions/destroy-focused-syno';
import type { MutableEditorState } from '../../../../types/mutable-editor-state';
import type { UnistlikeEdit } from '../../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../../types/cross-context/warn';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';

export default (
  state: StateSelector,
  action: DestroyFocusedSyno,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  const { focusedPresnoId } = action;

  if (state.treeLoaded() === false) {
    warnUser('Ignoring attempted syno deletion: no code loaded');
    return;
  }

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring attempted deletion of root syno');
    return;
  }

  latestEdit.push({
    undo: { type: 'CREATE_SYNO' },
    redo: { type: 'DELETE_SYNO' },
  });

  if (!(focusedPresnoId in draftState.synoMap)) {
    throw new TypeError('Focused syno is not in editee syno map!?');
  }

  // delete it (including its references)
  delete draftState.synoMap[focusedPresnoId];
  // TODO: recursively delete orphaned descendants

  // forget references from
  forSynoRefIn(state.getSyno(focusedPresnoId), synoRef => {
    if (state.synoMap()[synoRef.id]) { // referent is in this tree
      draftState.inverseReferenceMap[synoRef.id].delete(focusedPresnoId);
    }
  });

  // delete references to
  const referrerIds = state.inverseReferenceMap()[focusedPresnoId];

  referrerIds.forEach(referrerId => {
    const oldReferrer = state.synoMap()[referrerId];
    const newExReferrer = getDraftSyno(referrerId, state, draftState); // could be primitive

    forSynoRefIn(oldReferrer, (synoRef, edge) => {
      const { key, index } = edge;
      if (synoRef.id === focusedPresnoId) {
        if (typeof index !== 'undefined') { // ref in array
          (newExReferrer[key] as SynoRef[]).splice(index, 1);
        } else {
          newExReferrer[key] = null;
        }
      }
    });
  });

  // forget references to
  delete draftState.inverseReferenceMap[focusedPresnoId];
};
