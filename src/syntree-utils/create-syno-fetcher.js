// @flow
import type { SynoRef } from '../types/syno-ref.js'

export default (synoMap: {}) => {
  return  (ref: SynoRef) => {
    if (!ref.synoRef) { throw new Error('getSyno recieved non-SynoRef'); }
    const result = synoMap[ref.id];
    if (!result) { throw new Error('getSyno recieved broken SynoRef for provided SynoMap') }
    return result;
  }
}
