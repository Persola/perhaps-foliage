// @flow
import type { SynoRef } from '../types/syno-ref.js'

export default (synoMap: {}) => {
  return  (ref: SynoRef) => {
    return synoMap[ref.id];
  }
}
