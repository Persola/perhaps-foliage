import type { SynoMap } from '../types/syntactic/syno-map';
import type { SynoId } from '../types/syntactic/syno-id';
import type { Syno } from '../types/syntactic/syno';

export default (startingSynoId: SynoId, tree: SynoMap): Syno => {
  let currentSyno = tree[startingSynoId];
  let counter = 0;

  while (currentSyno.parent) {
    try {
      currentSyno = tree[currentSyno.parent.id];
    } catch (e) {
      if (e.name === 'getSyno recieved broken SynoRef for provided SynoMap') {
        throw new Error(
          `ascendToRoot hit broken parent reference ${counter} levels deep`,
        );
      } else {
        throw e;
      }
    }

    counter++;
  }

  return currentSyno;
};
