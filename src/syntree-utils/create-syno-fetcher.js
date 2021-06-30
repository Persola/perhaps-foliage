// @flow
import type { SynoRef } from '../types/syno-ref.js';
import type { Syno } from '../types/syno.js';

export default (synoMap: {}): ((SynoRef) => Syno) => {
  return (
    (ref: SynoRef) => {
      if (!ref.synoRef) { throw new Error('getSyno recieved non-SynoRef'); }
      const result = synoMap[ref.id];
      if (!result) { throw new Error('getSyno recieved broken SynoRef for provided SynoMap'); }
      return result;
    }
  );
};
