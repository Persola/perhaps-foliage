import forSynoRefIn from '../../syntree-utils/for-syno-ref-in';
import forChildSynoOf from '../../syntree-utils/for-child-syno-of';

import type { SynoId } from '../../types/syntactic/syno-id';
import type { SynoMap } from '../../types/syntactic/syno-map';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

const addInverseRef = (
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
  primitives: SynoMap,
): void => {
  const currentSyno = synoMap[currentId];
  forSynoRefIn(currentSyno, synoRef => {
    addInverseRef(irm, synoRef.id, currentSyno.id);
  });
  forChildSynoOf(currentSyno, childRef => {
    // b/c for the moment in saliva primitives are funcall children (TODO: make into non-tree)
    if (!Object.keys(primitives).includes(childRef.id)) {
      depthFirstBuildInverseReferences(irm, synoMap, childRef.id, primitives);
    }
  });
};

export default (
  synoMap: SynoMap,
  rootId: SynoId,
  primitives: SynoMap,
): MutableInverseReferenceMap => {
  const inverseReferenceMap = {};
  depthFirstBuildInverseReferences(inverseReferenceMap, synoMap, rootId, primitives);
  return inverseReferenceMap;
};
