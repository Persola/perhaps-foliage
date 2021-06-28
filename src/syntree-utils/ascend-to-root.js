// @flow
import type { SynoId } from '../types/syno-id.js';

export default (startingSynoId: SynoId, getSyno: Function) => {
  let currentSyno = getSyno({
    synoRef: true,
    id: startingSynoId,
  });
  let counter: number = 0;
  while (currentSyno.parent) {
    try {
      currentSyno = getSyno(currentSyno.parent);
    } catch (e) {
      if (e.name === 'getSyno recieved broken SynoRef for provided SynoMap') {
        throw new Error(`ascendToRoot hit broken parent reference ${counter} levels deep`);
      } else { throw e; }
    }

    counter++;
  }

  return currentSyno;
};
