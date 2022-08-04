import getDraftSyno from '../../main-process/heart/reducers/draft-utils/get-draft-syno';

import type { StateSelector } from '../../types/state-selector';
import type { MutableSynoMap } from '../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';
import type { SynoRef } from '../../types/syntactic/syno-ref';
import type { MutableSyntypeAttrs } from '../../types/syntactic/mutables/mutable-syntype-attrs';
import type { MutableSyno } from '../../types/syntactic/mutables/mutable-syno';
import type { SynoId } from '../../types/syntactic/syno-id';
import type { ChildEdge } from '../../types/syntactic/child-edge';

const addChildRefToParent = (
  newSyno: MutableSyno,
  draftParent: MutableSyno,
  childEdge: ChildEdge,
  inverseReferenceMap: MutableInverseReferenceMap,
): void => {
  const { key, index } = childEdge;

  const draftChildRef: SynoRef = {
    synoRef: true,
    relation: 'child',
    id: newSyno.id,
  };

  if (index !== undefined && typeof key === 'string') {
    (draftParent[key] as Array<SynoRef>).splice(index, 0, draftChildRef);
  } else if (typeof key === 'string') {
    draftParent[key] = draftChildRef;
  } else {
    throw new Error('syno had parent which did not have them as a child');
  }

  inverseReferenceMap[newSyno.id].add(draftParent.id);
};

const addParentRefToChild = (
  child: MutableSyno,
  parent: MutableSyno,
  inverseReferenceMap: MutableInverseReferenceMap,
): void => {
  child.parent = {
    synoRef: true,
    id: parent.id,
    relation: 'parent',
  };

  inverseReferenceMap[parent.id].add(child.id);
};

const createEdgeToParent = (
  orphanSyno: MutableSyno,
  draftParent: MutableSyno,
  childEdge: ChildEdge,
  inverseReferenceMap: MutableInverseReferenceMap,
) => {
  addParentRefToChild(orphanSyno, draftParent, inverseReferenceMap);
  addChildRefToParent(orphanSyno, draftParent, childEdge, inverseReferenceMap);
};

const createOrphan = (
  draftSynoMap: MutableSynoMap,
  newSynoId: SynoId,
  newSynoSyntypeAttrs: MutableSyntypeAttrs,
  inverseReferenceMap: MutableInverseReferenceMap,
) => {
  const orphanSyno = {
    id: newSynoId,
    parent: null,
    ...newSynoSyntypeAttrs,
  };
  draftSynoMap[newSynoId] = orphanSyno;
  inverseReferenceMap[newSynoId] = new Set();

  return orphanSyno;
};

export default (
  state: StateSelector,
  draft: MutableEditorState,
  draftSynoMap: MutableSynoMap,
  parentId: string | null,
  childEdge: ChildEdge,
  newSynoId: SynoId,
  newSynoSyntypeAttrs: MutableSyntypeAttrs,
): void => {
  if (Object.keys(draftSynoMap).includes(newSynoId)) {
    throw new Error('tried to create syno with in-use ID');
  }

  const orphanSyno = createOrphan(
    draftSynoMap,
    newSynoId,
    newSynoSyntypeAttrs,
    draft.inverseReferenceMap,
  );

  if (parentId) {
    const draftParent = getDraftSyno(parentId, state, draft);
    createEdgeToParent(orphanSyno, draftParent, childEdge, draft.inverseReferenceMap);
  }
};
