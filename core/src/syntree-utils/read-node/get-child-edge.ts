import forChildSynoOf from './for-child-syno-of';

import type { StateSelector } from '../../types/state-selector';
import type { Syno } from '../../types/syntactic/syno';
import type { ChildEdge } from '../../types/syntactic/child-edge';

export default (
  state: StateSelector,
  parent: Syno,
  child: Syno,
): ChildEdge => {
  const matchingEdges = [];

  forChildSynoOf(parent, (childRef, edge) => {
    if (childRef.id === child.id) {
      matchingEdges.push(edge);
    }
  });

  if (matchingEdges.length === 0) {
    return null;
  }

  if (matchingEdges.length !== 1) {
    throw new TypeError(`syno (${parent.id}) has multiple child refs to child (${child.id})`);
  }

  return matchingEdges[0];
};
