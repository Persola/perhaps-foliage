// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js';
import ascendToRoot from '../syntree-utils/ascend-to-root.js';

import type { SynoId } from '../types/syno-id.js';
import type { SynoMap } from '../types/syno-map.js';
import type { MutableInverseReferenceMap } from '../types/editor-state/mutable-inverse-reference-map.js';

const createOrAdd = (
  irm: MutableInverseReferenceMap,
  referantId: SynoId,
  referrerId: SynoId,
) => {
  irm[referantId] = irm[referantId] || new Set();
  irm[referantId].add(referrerId);
};

const depthFirstBuildInverseReferences = (
  irm: MutableInverseReferenceMap,
  synoMap: SynoMap,
  currentId: SynoId,
) => {
  const currentSyno = synoMap[currentId];

  Object.values(currentSyno).forEach(attrVal => {
    // $FlowIssue: poorly typed ECMA built-in (Object.entries)
    if (attrVal.synoRef) {
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      createOrAdd(irm, attrVal.id, currentSyno.id);
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      if (attrVal.relation === 'child') {
        // $FlowIssue: poorly typed ECMA built-in (Object.entries)
        depthFirstBuildInverseReferences(irm, synoMap, attrVal.id);
      }
    } else if (attrVal instanceof Array) { // nested children (arguments, parameters)
      attrVal.forEach(el => {
        if (el.synoRef) {
          createOrAdd(irm, el.id, currentSyno.id);
          if (el.relation === 'child') {
            depthFirstBuildInverseReferences(irm, synoMap, el.id);
          }
        }
      });
    }
  });

  return irm;
};

export default (synoMap: SynoMap): MutableInverseReferenceMap => {
  const getSyno = createSynoFetcher(synoMap);
  const root = ascendToRoot(Object.keys(synoMap)[0], getSyno);
  return depthFirstBuildInverseReferences({}, synoMap, root.id);
};
