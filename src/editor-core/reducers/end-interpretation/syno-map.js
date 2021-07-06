// @flow
import mutateSynoMap from '../state-slice-helpers/syno-map/mutate-syno-map';
import dup from '../../../syntree-utils/dup.js';

import type { SynoMap } from '../../../types/syno-map';
import type { EndInterpretation } from '../../../types/actions/end-interpretation';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';
import type { MutableSyno } from '../../../types/mutable-syno';

export default (
  oldSynoMap: SynoMap,
  action: EndInterpretation,
): SynoMap => {
  return mutateSynoMap(oldSynoMap, (newSynoMap: MutableSynoMap) => {
    const result: MutableSyno = dup(action.result);
    newSynoMap[result.id] = result;
    return newSynoMap;
  });
};
