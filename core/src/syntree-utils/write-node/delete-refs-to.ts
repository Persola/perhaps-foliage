import getDraftSyno from '../../main-process/heart/reducers/draft-utils/get-draft-syno';
import forSynoRefTo from '../read-node/for-syno-ref-to';
import deleteRef from './delete-ref';

import type { StateSelector } from '../../types/state-selector';
import type { MutableEditorState } from '../../types/mutable-editor-state';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  focusedPresnoId: string,
): void => {
  forSynoRefTo(
    focusedPresnoId,
    state.synoMap(),
    state.inverseReferenceMap(),
    (referrerId, synoRef, edge) => {
      if (synoRef.id === focusedPresnoId) {
        const newExReferrer = getDraftSyno(referrerId, state, draftState);

        deleteRef(
          newExReferrer,
          edge,
          draftState.inverseReferenceMap,
        );
      }
    },
  );
};
