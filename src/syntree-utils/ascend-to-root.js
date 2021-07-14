// @flow
import type { StateSelector } from '../types/state-selector';
import type { SynoId } from '../types/syno-id.js';
import type { Syno } from '../types/syno.js';

export default (startingSynoId: SynoId, state: StateSelector): Syno => {
  let currentSyno = state.getSyno(startingSynoId);
  let counter: number = 0;
  while (currentSyno.parent) {
    try {
      currentSyno = state.getSyno(currentSyno.parent.id);
    } catch (e) {
      if (e.name === 'getSyno recieved broken SynoRef for provided SynoMap') {
        throw new Error(`ascendToRoot hit broken parent reference ${counter} levels deep`);
      } else { throw e; }
    }

    counter++;
  }

  return currentSyno;
};
