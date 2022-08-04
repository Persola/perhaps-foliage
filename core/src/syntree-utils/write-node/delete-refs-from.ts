import forSynoRefFrom from '../read-node/for-syno-ref-from';
import deleteRef from './delete-ref';

import type { StateSelector } from '../../types/state-selector';
import type { MutableEditorState } from '../../types/mutable-editor-state';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  focusedPresnoId: string,
): void => {
  forSynoRefFrom(state.getSyno(focusedPresnoId), (synoRef, edge) => {
    if (state.synoMap()[synoRef.id]) { // referent is in this tree
      deleteRef(
        draftState.synoMap[focusedPresnoId],
        edge,
        draftState.inverseReferenceMap,
      );
    }
  });
};
