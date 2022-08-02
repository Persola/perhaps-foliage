import forSynoRefFrom from './for-syno-ref-from';

import type { Syno } from '../../types/syntactic/syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';

export default (
  parentSyno: Syno,
  callback: (synoRef: SynoRef, key: string, index?: number) => void,
): void => {
  forSynoRefFrom(parentSyno, (synoRef, edge) => {
    const { key, index } = edge;
    if (synoRef.relation === 'child') {
      callback(synoRef, key, index);
    }
  });
};