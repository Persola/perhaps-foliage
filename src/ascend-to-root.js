// @flow
import type { syno } from './types/syno.js'

export default (startingSyno: syno, getSyno: Function) => {
  let currentSyno = startingSyno;
  while (currentSyno.parent) {
    currentSyno = getSyno(currentSyno.parent);
  }

  return currentSyno;
}
