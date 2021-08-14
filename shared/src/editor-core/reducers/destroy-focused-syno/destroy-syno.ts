import getDraftSyno from '../draft-utils/get-draft-syno';

import type { StateSelector } from '../../../types/state-selector';
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { MutableSynoMap } from '../../../types/syntactic/mutables/mutable-syno-map';

export default (
  state: StateSelector,
  action: DestroyFocusedSyno,
  draftState: MutableEditorState,
): void => {
  // TODO: delete orphaned children from store
  // TODO: and references outside parent in general (need backwards reference reference?)
  const { focusedPresnoId } = action;

  if (state.treeLoaded() === false) {
    return;
  }

  const draftSynoMap: MutableSynoMap = draftState.synoMap;

  if (state.focusedSynoIsRoot()) {
    console.warn('ignoring attempted deletion of root syno');
    return;
  }

  delete draftSynoMap[focusedPresnoId]; // cannot be primitive

  const parentRef = state.getSyno(focusedPresnoId).parent;
  const referrerIds = new Set([
    parentRef.id,
    ...state.inverseReferenceMap()[focusedPresnoId],
  ]);
  referrerIds.forEach(referrerId => {
    const oldReferrer = state.synoMap()[referrerId];
    const newExReferrer = getDraftSyno(referrerId, state, draftState); // could be primitive

    Object.entries(oldReferrer).forEach(([key, attrVal]) => {
      // @ts-ignore: hm, how do we test otherwise? could type syno attrs as not being null, etc.
      if (attrVal.synoRef && attrVal.id === focusedPresnoId) {
        newExReferrer[key] = null;
      } else if (attrVal instanceof Array) {
        // nested children
        attrVal.forEach((el, ind) => {
          if (el.synoRef && el.id === focusedPresnoId) {
            attrVal.splice(ind, 1);
          }
        });
      }
    });
  });
};