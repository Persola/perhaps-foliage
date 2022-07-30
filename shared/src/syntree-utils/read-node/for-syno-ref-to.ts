import forSynoRefFrom from './for-syno-ref-from';

import type { SynoMap } from '../../types/syntactic/syno-map';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';
import type { InverseReferenceMap } from '../../types/editor-state/inverse-reference-map';

export default (
  referentId: string,
  synoMap: SynoMap,
  inverseReferenceMap: InverseReferenceMap,
  callback: (referrerId: string, synoRef: SynoRef, edge: Edge) => void,
): void => {
  inverseReferenceMap[referentId].forEach(referrerId => {
    const referrer = synoMap[referrerId];

    forSynoRefFrom(referrer, (synoRef, edge) => {
      if (synoRef.id === referentId) {
        callback(referrerId, synoRef, edge);
      }
    });
  });
};
