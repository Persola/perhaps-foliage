import ensureRef from './ensure-ref';

import type { SynoRef } from '../../types/syntactic/syno-ref';
import { Syno } from '../../types/syntactic/syno';
import { Edge } from '../../types/syntactic/edge';

export default (
  syno: Syno,
  edge: Edge,
): SynoRef => {
  const { key, index } = edge;
  if (index) {
    return syno[key][index];
  }

  const ref = ensureRef(syno[key]);

  return ref;
};
