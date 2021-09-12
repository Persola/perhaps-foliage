import type { SynoMap } from '../types/syntactic/syno-map';
import type { SynoId } from '../types/syntactic/syno-id';
import type { Syno } from '../types/syntactic/syno';

export default (startingSynoId: SynoId, tree: SynoMap): Syno => {
  let currentSyno = tree[startingSynoId];

  if (typeof currentSyno === 'undefined') {
    throw new Error('ascendToRoot received bad syno ID');
  }

  let counter = 0;

  try {
    while (currentSyno.parent) {
      currentSyno = tree[currentSyno.parent.id];
      counter++;
    }
  } catch (e) {
    if (e.name === 'getSyno recieved broken SynoRef for provided SynoMap') {
      throw new Error(
        `ascendToRoot hit broken parent reference ${counter} levels deep`,
      );
    } else {
      throw e;
    }
  }

  return currentSyno;
};
