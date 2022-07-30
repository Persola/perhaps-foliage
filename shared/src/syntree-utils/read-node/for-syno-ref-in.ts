import type { Syno } from '../../types/syntactic/syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';

export default (
  syno: Syno,
  callback: (synoRef: SynoRef, edge: Edge) => void,
): void => {
  Object.entries(syno).forEach(([key, val]) => {
    if (val && val.synoRef === true) {
      const index = undefined;
      callback(val, { key, index });
    } else if (val instanceof Array) {
      val.forEach((el, index) => {
        if (el.synoRef === true) {
          callback(el, { key, index });
        }
      });
    }
  });
};
