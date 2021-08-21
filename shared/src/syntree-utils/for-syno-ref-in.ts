import type { Syno } from '../types/syntactic/syno';
import type { SynoRef } from '../types/syntactic/syno-ref';

export default (
  syno: Syno,
  callback: (synoRef: SynoRef, key: string, index?: number) => void,
): void => {
  Object.entries(syno).forEach(([key, val]) => {
    // @ts-ignore: need to syno's children attrs better
    if (val && val.synoRef) {
      // @ts-ignore: need to syno's children attrs better
      callback(val, key);
    } else if (val instanceof Array) {
      val.forEach((el, index) => {
        if (el.synoRef) {
          callback(el, key, index);
        }
      });
    }
  });
};
