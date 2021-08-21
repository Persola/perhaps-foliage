import getDraftSyno from '../draft-utils/get-draft-syno';
import forSynoRefIn from '../../../../syntree-utils/for-syno-ref-in';

import type { StateSelector } from '../../../../types/state-selector';
import type { DestroyFocusedSyno } from '../../../../types/actions/destroy-focused-syno';
import type { MutableEditorState } from '../../../../types/mutable-editor-state';
import type { MutableSynoMap } from '../../../../types/syntactic/mutables/mutable-syno-map';
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

  const draftSynoMap: MutableSynoMap = draftState.synoMap;

  if (!(focusedPresnoId in draftSynoMap)) {
    throw new TypeError('Focused syno is not in editee syno map!?');
  }

  delete draftSynoMap[focusedPresnoId];
  // TODO: recursively delete orphaned descendants

  const referrerIds = state.inverseReferenceMap()[focusedPresnoId];

  referrerIds.forEach(referrerId => {
    const oldReferrer = state.synoMap()[referrerId];
    const newExReferrer = getDraftSyno(referrerId, state, draftState); // could be primitive

    forSynoRefIn(oldReferrer, (synoRef, key, index) => {
      if (synoRef.id === focusedPresnoId) {
        if (index) { // ref in array
          (newExReferrer[key] as SynoRef[]).splice(index, 1);
        } else {
          newExReferrer[key] = null;
        }
      }
    });
  });
};
