import deleteReferencesFrom from '../write-node/delete-refs-from';
import deleteReferencesTo from '../write-node/delete-refs-to';
import getChildEdge from '../read-node/get-child-edge';

import type { StateSelector } from '../../types/state-selector';
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { ChildEdge } from '../../types/syntactic/child-edge';

export default (
  destroyeeId: string,
  state: StateSelector,
  draftState: MutableEditorState,
): ChildEdge => {
  if (state.treeLoaded() === false) {
    throw new TypeError('Cannot destroy syno with no tree loaded');
  }

  if (state.focusedSynoIsRoot()) {
    throw new TypeError('Cannot destroy root syno');
  }

  if (!(destroyeeId in draftState.synoMap)) {
    throw new TypeError('Focused syno is not in editee syno map!?');
  }

  const destroyee = state.synoMap()[destroyeeId];
  const destroyeeParent = state.synoMap()[destroyee.parent.id];
  const childEdgeOfParent: ChildEdge = getChildEdge(state, destroyeeParent, destroyee);

  deleteReferencesFrom(state, draftState, destroyeeId);
  deleteReferencesTo(state, draftState, destroyeeId);
  delete draftState.synoMap[destroyeeId];
  // TODO: recursively delete orphaned descendants
  return childEdgeOfParent;
};
