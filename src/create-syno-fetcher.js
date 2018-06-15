// @noflow
import type { synoRef } from './types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (synoMap: {}) => {
  return  (ref: synoRef) => {
    return synoMap[ref.id];
  }
}
