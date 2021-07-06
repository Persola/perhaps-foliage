// @flow
import destroySyno from '../state-slice-helpers/syno-map/destroy-syno';
import mutateSynoMap from '../state-slice-helpers/syno-map/mutate-syno-map';
import NorPrimitiveId from '../../../extension-staging-area/saliva/nor-primitive-id.js';

import type { SynoMap } from '../../../types/syno-map';
import type { DestroyFocusedSyno } from '../../../types/actions/destroy-focused-syno';
import type { InverseReferenceMap } from '../../../types/editor-state/inverse-reference-map';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';

export default (
  oldSynoMap: SynoMap,
  action: DestroyFocusedSyno,
  inverseReferenceMap: InverseReferenceMap,
): SynoMap => {
  return mutateSynoMap(oldSynoMap, (newSynoMap: MutableSynoMap) => {
    const { focusedPresnoId } = action;
    if (
      oldSynoMap[focusedPresnoId].parent === false
      || focusedPresnoId === NorPrimitiveId
      || (
        oldSynoMap[focusedPresnoId].parent
        && oldSynoMap[focusedPresnoId].parent.id === NorPrimitiveId
      )
    ) {
      console.warn("ignoring syno detruction: can't destroy NOR primitive or children");
      return newSynoMap;
    }
    destroySyno(action, newSynoMap, oldSynoMap, inverseReferenceMap); // modifies newSynoMap
    return newSynoMap;
  });
};
