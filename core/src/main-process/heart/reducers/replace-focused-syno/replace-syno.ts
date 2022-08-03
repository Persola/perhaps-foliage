import getDraftSyno from '../draft-utils/get-draft-syno';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableSynoMap } from '../../../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../../../types/mutable-editor-state';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';
import type { MutableSyntypeAttrs } from '../../../../types/syntactic/mutables/mutable-syntype-attrs';
import type { MutableSyno } from '../../../../types/syntactic/mutables/mutable-syno';
import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { Edge } from '../../../../types/syntactic/edge';

const replaceRefInParent = (
  childEdge: Edge,
  draftParent: MutableSyno,
  newSynoId: string,
) => {
  const { key, index } = childEdge;

  const draftChildRef: SynoRef = {
    synoRef: true,
    relation: 'child',
    id: newSynoId,
  };

  if (index !== null && typeof key === 'string') {
    (draftParent[key] as Array<SynoRef>).splice(index, 1, draftChildRef);
  } else if (typeof key === 'string') {
    draftParent[key] = draftChildRef;
  } else {
    throw new Error('syno had parent which did not have them as a child');
  }
};

const parentAttr = (parentId: string | null): SynoRef => {
  if (!parentId) {
    return null;
  }

  return {
    synoRef: true,
    id: parentId,
    relation: 'parent',
  };
};

export default (
  state: StateSelector,
  draft: MutableEditorState,
  draftSynoMap: MutableSynoMap,
  replaceeId: string,
  parentId: (string | null),
  edgeWithParent: (Edge | null),
  newSynoId: SynoId,
  newSynoSyntypeAttrs: MutableSyntypeAttrs,
): void => {
  if (Object.keys(draftSynoMap).includes(newSynoId)) {
    throw new Error('tried to create syno with in-use ID');
  }

  draftSynoMap[newSynoId] = {
    id: newSynoId,
    parent: parentAttr(parentId),
    ...newSynoSyntypeAttrs,
  };

  delete draftSynoMap[replaceeId];
  // TODO: recursively delete orphaned descendants

  if (parentId) {
    const draftParent = getDraftSyno(parentId, state, draft);
    replaceRefInParent(edgeWithParent, draftParent, newSynoId);
  }
};
