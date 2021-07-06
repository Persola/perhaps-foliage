// @flow
import dup from '../../../../syntree-utils/dup.js';

import type { SynoMap } from '../../../../types/syno-map';
import type { MutableSynoMap } from '../../../../types/mutable-syno-map';

export default (
  oldSynoMap: SynoMap,
  mutation: (MutableSynoMap) => MutableSynoMap,
): SynoMap => {
  const mutableNewSynoMap: MutableSynoMap = dup(oldSynoMap);
  return ((mutation(mutableNewSynoMap): any): SynoMap);
};
