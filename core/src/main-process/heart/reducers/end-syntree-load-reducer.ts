import deriveInverseReferenceMap from '../derive-inverse-reference-map';
import ascendToRoot from '../../../syntree-utils/read-tree/ascend-to-root';

import type { MutableSynoMap } from '../../../types/syntactic/mutables/mutable-syno-map';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { Warn } from '../../../types/cross-context/warn';
import type { EndAsyncSyntreeLoad } from '../../../types/actions/end-syntree-load';
import type { StateSelector } from '../../../types/state-selector';

export default (
  state: StateSelector,
  action: EndAsyncSyntreeLoad,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring END_SYNTREE_LOAD action: no integration loaded');
    return;
  }

  if (action.newSynoMap === null) {
    // load failed, just stop loading
    draftState.loadingSyntree = false;
    return;
  }

  const newSyntree: MutableSynoMap = action.newSynoMap;
  const rootSyno = ascendToRoot(Object.keys(newSyntree)[0], newSyntree);
  Object.assign(draftState, {
    synoMap: newSyntree,
    inverseReferenceMap: deriveInverseReferenceMap(newSyntree),
    focus: {
      synoId: rootSyno.id,
      presnoIndex: null,
      charIndex: null,
    },
    resultSyntreeRootId: null,
    interpreting: false,
    resultOutdated: false,
    loadingSyntree: false,
  });
};
