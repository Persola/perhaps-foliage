// @flow
import type { SynoRef } from '../types/syno-ref.js'

export default (synoMap: {}) => {
  return  (ref: SynoRef) => {
    if (!ref.synoRef) { throw new Error('getSyno recieved non-SynoRef'); }
    return synoMap[ref.id];
  }
}
