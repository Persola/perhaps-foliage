import ensureRef from '../read-ref/ensure-ref';

import type { SynoRef } from '../../types/syntactic/syno-ref';
import { Syno } from '../../types/syntactic/syno';
import { ChildEdge } from '../../types/syntactic/child-edge';

export default (
  referer: Syno,
  edge: ChildEdge,
): SynoRef => {
  const { key, index } = edge;
  if (index !== undefined) {
    return referer[key][index];
  }

  const ref = ensureRef(referer[key]);

  return ref;
};
