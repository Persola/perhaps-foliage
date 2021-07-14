// @flow
import type { StateSelector } from '../../../../types/state-selector';
import type { DestroyFocusedSyno } from '../../../../types/actions/destroy-focused-syno';
import type { MutableSynoMap } from '../../../../types/mutable-syno-map';

export default (
  state: StateSelector,
  action: DestroyFocusedSyno,
  draftState: MutableSynoMap,
): void => {
  // TODO: delete orphaned children from store
  // TODO: and references outside parent in general (need backwards reference reference?)
  const { focusedPresnoId } = action;

  if (state.focusedSynoIsRoot()) {
    console.warn('ignoring attempted deletion of root syno');
    return;
  }

  delete draftState[focusedPresnoId];

  const parentRef = state.getSyno(focusedPresnoId).parent;
  // $FlowFixMe: Flow doesn't look into selector interface
  const referrerIds = new Set([parentRef.id, ...(state.inverseReferenceMap()[focusedPresnoId])]);
  referrerIds.forEach(referrerId => {
    const oldReferrer = state.synoMap()[referrerId];
    const newExReferrer = draftState[referrerId];
    Object.entries(oldReferrer).forEach(([key, attrVal]) => {
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      if (attrVal.synoRef && attrVal.id === focusedPresnoId) {
        newExReferrer[key] = false;
      } else if (attrVal instanceof Array) { // nested children (arguments, parameters)
        attrVal.forEach((el, ind) => {
          if (el.synoRef && el.id === focusedPresnoId) {
            newExReferrer[key].splice(ind, 1);
          }
        });
      }
    });
  });
};
