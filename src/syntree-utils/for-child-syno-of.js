// @flow
import type { Syno } from '../types/syno.js'
import type { SynoRef } from '../types/syno-ref.js'

export default (parentSyno: Syno, callback: (SynoRef) => void) => {
  for (let key in parentSyno) {
    if (
      parentSyno[key].synoRef &&
      parentSyno[key].relation === 'child'
    ) {
      callback(parentSyno[key]);
    } else if (parentSyno[key] instanceof Array) { // nested children (arguments, parameters)
      for (let el of parentSyno[key]) {
        if (
          el.synoRef &&
          el.relation === 'child'
        ) {
          callback(el);
        }
      }
    }
  }
}
