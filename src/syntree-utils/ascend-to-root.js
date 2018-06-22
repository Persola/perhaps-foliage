// @flow
import type { Syno } from '../types/syno.js'

export default (startingSyno: Syno, getSyno: Function) => {
  let currentSyno = startingSyno;
  while (currentSyno.parent) {
    currentSyno = getSyno(currentSyno.parent);
  }

  return currentSyno;
}
