import isRef from '../read-other/is-ref';

import type { Syno } from '../../types/syntactic/syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';

export default (
  syno: Syno,
  callback: (synoRef: SynoRef, edge: Edge) => void,
): void => {
  Object.entries(syno).forEach(([key, val]) => {
    if (isRef(val)) {
      const index = undefined;
      callback((val as SynoRef), { key, index });
    } else if (val instanceof Array) {
      val.forEach((el, index) => {
        if (isRef(el)) {
          callback(el, { key, index });
        }
      });
    }
  });
};
