// @flow
import type { SynoMap } from '../../../types/syno-map'
import type { InverseReferenceMap } from '../../../types/editor-state/inverse-reference-map'
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno'

export default (
  action: DestroyFocusedSyno,
  newSynoMap: SynoMap,
  oldState: SynoMap,
  inverseReferenceMap: InverseReferenceMap
) => {
  // TODO: delete orphaned children from store
  // TODO: and references outside parent in general (need backwards reference reference?)
  const { focusedPresnoId } = action;
  

  const parentRef = oldState[focusedPresnoId].parent;
  if (parentRef === false) {
    console.warn('ignoring attempted deletion of root syno');
    return oldState;
  }
  
  delete newSynoMap[focusedPresnoId];

  // const newParent = newSynoMap[parentRef.id];
  const referrerIds = new Set([parentRef.id]);
  for (let referrerId of inverseReferenceMap[focusedPresnoId]) {
    referrerIds.add(referrerId);
  }
  for (let referrerId of referrerIds) {
    const oldReferrer = oldState[referrerId];
    const newExReferrer = newSynoMap[referrerId];
    for (let key in oldReferrer) {
      if (oldReferrer[key].synoRef && oldReferrer[key].id === focusedPresnoId) {
        newExReferrer[key] = false;
      } else if (oldReferrer[key] instanceof Array) { // nested children (arguments, parameters)
        oldReferrer[key].forEach((el, ind) => {
          if (el.synoRef && el.id === focusedPresnoId) {
            newExReferrer[key].splice(ind, 1);
          }
        });
      }
    }
  }
}
