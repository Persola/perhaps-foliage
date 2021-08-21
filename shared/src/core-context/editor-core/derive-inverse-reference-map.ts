import type { SynoId } from '../../types/syntactic/syno-id';
import type { SynoMap } from '../../types/syntactic/syno-map';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

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
    // @ts-ignore: hm, how do we test otherwise? could type syno attrs as not being null, etc.
    if (attrVal.synoRef === true) {
      createOrAdd(irm, (attrVal as SynoRef).id, currentSyno.id);

      if ((attrVal as SynoRef).relation === 'child') {
        depthFirstBuildInverseReferences(irm, synoMap, (attrVal as SynoRef).id);
      }
    } else if (attrVal instanceof Array) {
      // nested children
      attrVal.forEach(el => {
        if (el.synoRef === true) {
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

export default (
  synoMap: SynoMap,
  rootId: SynoId,
): MutableInverseReferenceMap => {
  return depthFirstBuildInverseReferences({}, synoMap, rootId);
};
