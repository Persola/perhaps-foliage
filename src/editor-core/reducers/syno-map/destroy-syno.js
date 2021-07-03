// @flow
import type { SynoMap } from '../../../types/syno-map';
import type { InverseReferenceMap } from '../../../types/editor-state/inverse-reference-map';
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';

export default (
  action: DestroyFocusedSyno,
  newSynoMap: MutableSynoMap,
  oldState: SynoMap,
  inverseReferenceMap: InverseReferenceMap,
): void => {
  // TODO: delete orphaned children from store
  // TODO: and references outside parent in general (need backwards reference reference?)
  const { focusedPresnoId } = action;

  const parentRef = oldState[focusedPresnoId].parent;
  if (parentRef === false) {
    console.warn('ignoring attempted deletion of root syno');
    return undefined;
  }

  delete newSynoMap[focusedPresnoId];

  // const newParent = newSynoMap[parentRef.id];
  const referrerIds = new Set([parentRef.id, ...(inverseReferenceMap[focusedPresnoId])]);
  referrerIds.forEach(referrerId => {
    const oldReferrer = oldState[referrerId];
    const newExReferrer = newSynoMap[referrerId];
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

  return undefined;
};
