import forSynoRefIn from '../../syntree-utils/read-node/for-syno-ref-in';

import type { SynoMap } from '../../types/syntactic/syno-map';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

export default (
  synoMap: SynoMap,
): MutableInverseReferenceMap => {
  const inverseRefMap = {};
  const thisMapKeys = Object.keys(synoMap);
  Object.values(synoMap).forEach(referrerSyno => {
    forSynoRefIn(referrerSyno, synoRef => {
      const referentId = synoRef.id;
      if (thisMapKeys.includes(synoRef.id)) { // don't track primitives
        inverseRefMap[referentId] = inverseRefMap[referentId] || new Set();
        inverseRefMap[referentId].add(referrerSyno.id);
      }
    });
  });

  return inverseRefMap;
};
