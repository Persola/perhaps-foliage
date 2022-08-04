import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { MutableSyno } from '../../types/syntactic/mutables/mutable-syno';
import type { ChildEdge } from '../../types/syntactic/child-edge';

const addParentRefToAdoptee = (
  adoptee: MutableSyno,
  adopter: MutableSyno,
  inverseReferenceMap: MutableInverseReferenceMap,
): void => {
  adoptee.parent = {
    synoRef: true,
    id: adopter.id,
    relation: 'parent',
  };

  inverseReferenceMap[adopter.id].add(adoptee.id);
};

const addChildRefToAdopter = (
  adoptee: MutableSyno,
  adopter: MutableSyno,
  childEdge: ChildEdge,
  inverseReferenceMap: MutableInverseReferenceMap,
): void => {
  const { key, index } = childEdge;

  const draftChildRef: SynoRef = {
    synoRef: true,
    relation: 'child',
    id: adoptee.id,
  };

  if (index !== undefined && typeof key === 'string') {
    (adopter[key] as Array<SynoRef>).splice(index, 0, draftChildRef);
  } else if (typeof key === 'string') {
    adopter[key] = draftChildRef;
  } else {
    throw new Error('syno had parent which did not have them as a child');
  }

  inverseReferenceMap[adoptee.id].add(adopter.id);
};

export default (
  adoptee: MutableSyno,
  adopter: MutableSyno,
  childEdge: ChildEdge,
  inverseReferenceMap: MutableInverseReferenceMap,
): void => {
  addParentRefToAdoptee(adoptee, adopter, inverseReferenceMap);
  addChildRefToAdopter(adoptee, adopter, childEdge, inverseReferenceMap);
};
