import forSynoRefIn from './for-syno-ref-in';

import type { Syno } from '../../types/syntactic/syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';

export default (
  parentSyno: Syno,
  callback: (synoRef: SynoRef, key: string, index?: number) => void,
): void => {
  forSynoRefIn(parentSyno, (synoRef, key, index) => {
    if (synoRef.relation === 'child') {
      callback(synoRef, key, index);
    }
  });
};
