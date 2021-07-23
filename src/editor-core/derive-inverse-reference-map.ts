// @flow
import type { SynoId } from '../types/syno-id';
import type { SynoMap } from '../types/syno-map';
import type { MutableInverseReferenceMap } from '../types/editor-state/mutable/mutable-inverse-reference-map';

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
    } else if (attrVal instanceof Array) { // nested children
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

export default (synoMap: SynoMap, rootId: SynoId): MutableInverseReferenceMap => {
  return depthFirstBuildInverseReferences({}, synoMap, rootId);
};
