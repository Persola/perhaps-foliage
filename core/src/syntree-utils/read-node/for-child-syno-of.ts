import forSynoRefFrom from './for-syno-ref-from';

import type { Syno } from '../../types/syntactic/syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';

export default (
  parentSyno: Syno,
  callback: (synoRef: SynoRef, edge: Edge) => void,
): void => {
  forSynoRefFrom(parentSyno, (synoRef, edge) => {
    if (synoRef.relation === 'child') {
      callback(synoRef, edge);
    }
  });
};
