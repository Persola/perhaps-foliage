import forSynoRefFrom from '../read-node/for-syno-ref-from';
import deleteRef from './delete-ref';

import type { StateSelector } from '../../types/state-selector';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { MutableSyno } from '../../types/syntactic/mutables/mutable-syno';
import type { ChildEdge } from '../../types/syntactic/child-edge';
import type { MutableInverseReferenceMap } from '../../types/editor-state/mutable/mutable-inverse-reference-map';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  focusedPresnoId: string,
): void => {
  const deleteRefArgs: [
    MutableSyno,
    ChildEdge,
    MutableInverseReferenceMap
  ][] = [];

  forSynoRefFrom(state.getSyno(focusedPresnoId), (synoRef, edge) => {
    if (state.synoMap()[synoRef.id]) { // referent is in this tree
      deleteRefArgs.push([
        draftState.synoMap[focusedPresnoId],
        edge,
        draftState.inverseReferenceMap,
      ]);
    }
  });

  // refs in arrays will be deleted in inverse index order
  deleteRefArgs.sort((firstArgs, secondArgs) => {
    if (firstArgs[1]?.index > secondArgs[1]?.index) {
      return -1;
    }

    return 1;
  });

  for (const args of deleteRefArgs) {
    deleteRef(...args);
  }
};
