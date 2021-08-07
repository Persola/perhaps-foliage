import type { Syno } from '../types/syntactic/syno';
import type { SynoRef } from '../types/syntactic/syno-ref';

export default (
  parentSyno: Syno,
  callback: (synoRef: SynoRef, key: string, index?: number) => void,
): void => {
  Object.entries(parentSyno).forEach(([key, val]) => {
    if (
      // @ts-ignore: need to syno's children attrs better
      val.synoRef // @ts-ignore: need to syno's children attrs better
      && val.relation === 'child'
    ) {
      // @ts-ignore: need to syno's children attrs better
      callback(val, key);
    } else if (val instanceof Array) {
      // nested children
      val.forEach((el, index) => {
        if (el.synoRef && el.relation === 'child') {
          callback(el, key, index);
        }
      });
    }
  });
};
