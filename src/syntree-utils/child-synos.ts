import forChildSynoOf from './for-child-syno-of';

import type { Syno } from '../types/syntactic/syno';
import type { SynoRef } from '../types/syntactic/syno-ref';

export default (parentSyno: Syno): SynoRef[] => {
  const childSynoRefs: SynoRef[] = [];
  forChildSynoOf(parentSyno, childRef => {
    childSynoRefs.push(childRef);
  });
  return childSynoRefs;
};
