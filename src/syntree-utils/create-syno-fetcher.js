// @flow
import type { SynoRef } from '../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (synoMap: {}) => {
  return  (ref: SynoRef) => {
    return synoMap[ref.id];
  }
}
