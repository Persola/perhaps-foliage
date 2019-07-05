// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js'
import ascendToRoot from '../syntree-utils/ascend-to-root.js'

import type { SynoId } from '../types/syno-id.js'
import type { SynoMap } from '../types/syno-map.js'
import type { InverseReferenceMap } from '../types/inverse-reference-map.js'

const createOrAdd = (
  irm: InverseReferenceMap,
  referant_id: SynoId,
  referrer_id: SynoId
) => {
  irm[referant_id] = irm[referant_id] || new Set();
  irm[referant_id].add(referrer_id);
};

const depthFirstBuildInverseReferences = (
  irm: InverseReferenceMap,
  synoMap: SynoMap,
  currentId: SynoId
) => {
  const currentSyno = synoMap[currentId];

  for (let key in currentSyno) {
    if (currentSyno[key].synoRef) {
      createOrAdd(irm, currentSyno[key].id, currentSyno.id);
      if (currentSyno[key].relation === 'child') {
        depthFirstBuildInverseReferences(irm, synoMap, currentSyno[key].id);
      }
    } else if (currentSyno[key] instanceof Array) { // nested children (arguments, parameters)
      for (let el of currentSyno[key]) {
        if (el.synoRef) {
          createOrAdd(irm, el.id, currentSyno.id);
          if (el.relation === 'child') {
            depthFirstBuildInverseReferences(irm, synoMap, el.id);
          }
        }
      }
    }
  }

  return irm;
}

export default (synoMap: SynoMap): InverseReferenceMap => {
  const getSyno = createSynoFetcher(synoMap);
  const root = ascendToRoot(Object.keys(synoMap)[0], getSyno);
  return depthFirstBuildInverseReferences({}, synoMap, root.id);
}
