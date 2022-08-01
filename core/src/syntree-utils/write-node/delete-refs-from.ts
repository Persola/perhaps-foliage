import getRef from '../read-node/get-ref';
import forSynoRefFrom from '../read-node/for-syno-ref-from';
import deleteRef from './delete-ref';

import type { MutableSyno } from '../../types/syntactic/mutables/mutable-syno';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { Edge } from '../../types/syntactic/edge';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

export default (
  referer: MutableSyno,
  referentId: string,
  inverseReferenceMap: MutableInverseReferenceMap,
  edge: (Edge | null),
): SynoRef[] => {
  const edges = [];

  if (edge) {
    const ref = getRef(referer, edge);
    if (ref.id !== referentId) {
      throw new TypeError(
        `Syno's (${referer.id}) ref at edge (${edge})`
        + ` did not match provided referentId (${referentId})`,
      );
    }
    edges.push(edge);
  } else {
    forSynoRefFrom(referer, (synoRef, refEdge) => {
      if (synoRef.id === referentId) {
        edges.push(refEdge);
      }
    });
  }

  const refs = [];
  for (edge of edges) {
    refs.push(
      deleteRef(referer, edge, inverseReferenceMap),
    );
  }

  return refs;
};
