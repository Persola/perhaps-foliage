import destroySyno from './destroy-syno';
import createSyno from './create-syno';

import type { StateSelector } from '../../types/state-selector';
import type { MutableSynoMap } from '../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { MutableSyntypeAttrs } from '../../types/syntactic/mutables/mutable-syntype-attrs';
import type { SynoId } from '../../types/syntactic/syno-id';
import type { ChildEdge } from '../../types/syntactic/child-edge';

export default (
  state: StateSelector,
  draft: MutableEditorState,
  draftSynoMap: MutableSynoMap,
  replaceeId: string,
  parentId: (string | null),
  newSynoId: SynoId,
  newSynoSyntypeAttrs: MutableSyntypeAttrs,
): void => {
  const deletedEdgeFromParent: ChildEdge = destroySyno(
    replaceeId,
    state,
    draft,
  );

  createSyno(
    state,
    draft,
    draftSynoMap,
    parentId,
    deletedEdgeFromParent,
    newSynoId,
    newSynoSyntypeAttrs,
  );
};
