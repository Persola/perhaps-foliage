import ensureRef from '../read-node/ensure-ref';

import type { SynoAttrVal } from '../../types/syntactic/mutables/syno-attr-val';
import type { MutableSyno } from '../../types/syntactic/mutables/mutable-syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

export default (
  referer: MutableSyno,
  edge: Edge,
  inverseReferenceMap: MutableInverseReferenceMap,
): SynoRef => {
  const { key, index } = edge;
  let attrVal: SynoAttrVal;
  let ref: SynoRef;
  if (index) {
    attrVal = referer[key][index];
    ref = ensureRef(attrVal);
    (referer[key] as SynoRef[]).splice(index, 1);
  } else {
    attrVal = referer[key];
    ref = ensureRef(attrVal);
    referer[key] = null;
  }

  inverseReferenceMap[referer.id].delete(ref.id);

  return ref;
};
